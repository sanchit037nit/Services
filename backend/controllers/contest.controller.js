import { Contest } from "../models/contest.model.js";
import { ContestGroup } from "../models/contestGroup.model.js";

// Fetch all upcoming and live contests
export const getContests = async (req, res) => {
  try {
    const contests = await Contest.find({ 
      status: { $in: ["UPCOMING", "ACTIVE"] } 
    }).sort({ startTime: 1 });

    res.status(200).json(contests);
  } catch (error) {
    console.error("Error in getContests controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch a specific contest group (with its messages and participants)
export const getContestGroup = async (req, res) => {
  try {
    const { contestId } = req.params;
    const group = await ContestGroup.findOne({ contestId })
      .populate("participants", "username profilePic")
      .populate("messages.sender", "username profilePic")
      .populate("messages.solutionId", "title language"); // Assuming solution model has title/language

    if (!group) {
      return res.status(404).json({ error: "Contest group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in getContestGroup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Join a contest group
export const joinGroup = async (req, res) => {
  try {
    const { contestId } = req.params;
    const userId = req.user._id; // Assuming protectroute attaches req.user

    const group = await ContestGroup.findOne({ contestId });
    if (!group) {
      return res.status(404).json({ error: "Contest group not found" });
    }

    if (!group.participants.includes(userId)) {
      group.participants.push(userId);
      await group.save();
    }

    res.status(200).json({ message: "Successfully joined group", group });
  } catch (error) {
    console.error("Error in joinGroup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Post a message or solution link to the group
export const postMessage = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { content, solutionId } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const group = await ContestGroup.findOne({ contestId });
    if (!group) {
      return res.status(404).json({ error: "Contest group not found" });
    }

    if (group.status === "ARCHIVED") {
      return res.status(403).json({ error: "This contest group is archived. You cannot post new messages." });
    }

    const newMessage = {
      sender: userId,
      content,
      solutionId: solutionId || null,
      timestamp: new Date()
    };

    group.messages.push(newMessage);
    await group.save();

    // Populate sender details so the frontend has the user's name/profilePic
    const populatedGroup = await ContestGroup.findById(group._id).populate("messages.sender", "name username profilePic");
    const broadcastMessage = populatedGroup.messages[populatedGroup.messages.length - 1];

    // Broadcast the new message to all users currently in this contest room
    if (global.io) {
      global.io.to(contestId).emit("new_group_message", broadcastMessage);
    }

    res.status(201).json(broadcastMessage);
  } catch (error) {
    console.error("Error in postMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
