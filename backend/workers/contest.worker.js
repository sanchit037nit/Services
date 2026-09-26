import cron from "node-cron";
import axios from "axios";
import { Contest } from "../models/contest.model.js";
import { ContestGroup } from "../models/contestGroup.model.js";

// Kontests API provides a free list of upcoming competitive programming contests
const KONTESTS_API_URL = "https://kontests.net/api/v1/all";
const CODEFORCES_API_URL = "https://codeforces.com/api/contest.list";

const fetchContestsJob = async () => {
  console.log("⏳ [Worker] Fetching upcoming contests from Kontests API...");
  try {
    let contests = [];
    
    try {
      // Primary API
      const response = await axios.get(KONTESTS_API_URL, { timeout: 10000 });
      contests = response.data.filter(c => c.status === "BEFORE");
    } catch (apiError) {
      console.warn("⚠️ [Worker] Kontests API failed or timed out. Falling back to Codeforces API...");
      
      // Fallback API (Codeforces)
      const cfResponse = await axios.get(CODEFORCES_API_URL, { timeout: 10000 });
      if (cfResponse.data.status === "OK") {
        // Map Codeforces data structure to match our expected format
        contests = cfResponse.data.result
          .filter(c => c.phase === "BEFORE")
          .map(c => ({
            name: c.name,
            site: "Codeforces",
            url: `https://codeforces.com/contest/${c.id}`,
            start_time: new Date(c.startTimeSeconds * 1000).toISOString(),
            end_time: new Date((c.startTimeSeconds + c.durationSeconds) * 1000).toISOString(),
            status: "BEFORE"
          }))
          .slice(0, 15); // limit to top 15 upcoming codeforces to avoid overloading DB
      }
    }
    
    let newGroupsCount = 0;

    for (const contestData of contests) {
      // Only process upcoming contests
      if (contestData.status !== "BEFORE") continue; 

      // Check if contest already exists in our DB to prevent duplicates
      const existingContest = await Contest.findOne({ contestName: contestData.name });
      
      if (!existingContest) {
        // 1. Create Contest Record
        const newContest = await Contest.create({
          platform: contestData.site,
          contestName: contestData.name,
          url: contestData.url,
          startTime: new Date(contestData.start_time),
          endTime: new Date(contestData.end_time),
          status: "UPCOMING"
        });

        // 2. Auto-Generate Contest Group for users to chat/post solutions
        await ContestGroup.create({
          contestId: newContest._id,
          name: `${contestData.site} - ${contestData.name}`,
          participants: [],
          messages: [],
          status: "ACTIVE" 
        });

        newGroupsCount++;
        
        if (global.io) {
          global.io.emit("new_contest_group", newContest);
        }
      }
    }

    console.log(`✅ [Worker] Fetched and stored ${newGroupsCount} new contest(s) and auto-generated groups.`);

    // 3. Lifecycle Management: Activate live contests & Archive ended contests
    console.log("⏳ [Worker] Updating contest lifecycle states...");
    const now = new Date();
    
    // A. Activate contests that have started
    const liveContests = await Contest.find({
      startTime: { $lte: now },
      endTime: { $gt: now },
      status: "UPCOMING"
    });

    for (const contest of liveContests) {
      contest.status = "ACTIVE";
      await contest.save();
      
      if (global.io) {
        global.io.emit("contest_live", { contestId: contest._id, name: contest.contestName });
      }
    }
    
    if (liveContests.length > 0) {
      console.log(`✅ [Worker] Activated ${liveContests.length} live contest(s).`);
    }

    // B. Archive contests that have ended
    const endedContests = await Contest.find({
      endTime: { $lt: now },
      status: { $ne: "ARCHIVED" }
    });

    for (const contest of endedContests) {
      contest.status = "ARCHIVED";
      await contest.save();

      const group = await ContestGroup.findOne({ contestId: contest._id });
      if (group) {
        group.status = "ARCHIVED";
        await group.save();
      }
    }
    
    if (endedContests.length > 0) {
      console.log(`✅ [Worker] Archived ${endedContests.length} past contest(s) and their groups.`);
    }

  } catch (error) {
    console.error("❌ [Worker] Error fetching contests:", error.message);
  }
};

export const startContestWorker = () => {
  // Run immediately on boot so you don't have to wait 12 hours!
  fetchContestsJob();

  // Schedule it to run every 12 hours: "0 */12 * * *"
  cron.schedule("0 */12 * * *", fetchContestsJob);

  console.log("⚙️  [Worker] Contest Background Worker initialized.");
};
