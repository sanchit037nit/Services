import Solution from "../models/solution.model.js";
import User from "../models/users.model.js";

export const createsol = async (req, res) => {
  const { doubt, description, language, platform, createdby } = req.body;

  try {
    const newsol = new Solution({
      doubt: doubt,
      description: description,
      language: language,
      platform: platform,
      createdby,
    });

    if (newsol) {
      await newsol.save();
      return res.status(201).json({
        success: true,
        message: "solution created",
      });
    }
  } catch (error) {
    console.log("error in creating solution", error);
    return res.status(400).json({ message: "solution not created" });
  }
};

export const deletesol = async (req, res) => {
  const id = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "text is required" });
    }

    const delsol = await Solution.findByIdAndDelete(id);

    if (delsol) {
      return res.status.json(201).json({
        success: true,
        message: "comment deleted",
      });
    } else throw "error not deleted";
  } catch (error) {
    console.log("error in deleting solution");
    return res.status(400).json({ message: "solution not deleted" });
  }
};

export const updatesol = async (req, res) => {
  const id = req.params;
  const { text } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ message: "text is required" });
    }

    const updatesol = Solution.findByIdAndUpdate(
      id,
      {
        $set: {
          doubt: doubt,
          description: description,
          language: language,
          platform: platform,
        },
      },
      { new: true }
    );

    if (updatesol) {
      return res.status.json(201).json({
        success: true,
        message: "solution updated",
      });
    } else throw "error not updated";
  } catch (error) {
    console.log("error in updating solution");
    return res.status(400).json({ message: "solution not updated" });
  }
};

export const getsol = async (req, res) => {
  try {
    const sols = await Solution.find();

    return res.status(200).json({ sols });
  } catch (error) {
    console.log("error in getting solutions", error);
    return res.status(400).json({
      message: "error in getting solutions",
    });
  }
};

export const bookmark = async (req, res) => {
  try {
    const userid = req.user._id;
    const { id: solid } = req.params;

    const sol = Solution.findById(solid);

    if (!sol) {
      return res.status(404).json({ error: "Solution not found" });
    }

    const userbookmarkedsol = sol.bookmarkedby.includes(userid);

    if (userbookmarkedsol) {
      await Solution.updateOne(
        { id: solid },
        { $pull: { bookmarkedby: userid } }
      );
      await User.updateOne({ id: userid }, { $pull: { bookmarks: solid } });

      const updatedbookmarks = Solution.bookmarkedby.filter(
        (id) => id.toString() !== userid.toString()
      );
      res.status(200).json(updatedbookmarks);
    } else {
      Solution.bookmarkedby.push(userid);
      await User.updateOne({ id: userid }, { $push: { bookmarks: solid } });
      await Solution.save();

      const updatedbookmarks = Solution.bookmarkedby.length();
      res.status(200).json(updatedbookmarks);
    }
  } catch (error) {
    console.log("Error in bookmarkPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeunlike = async (req, res) => {
  try {
    
    const userid = req.user._id.toString();
    // console.log(userid)
    const { id: solid } = req.params;
      console.log(solid)
    const sol = Solution.findById(solid);
     
    if (!sol) {
      return res.status(404).json({ error: "Solution not found" });
    }

     console.log(userid)
     console.log(sol)
    const userlikedsol = sol.likes.includes(userid);

    if (userlikedsol) {
      await Solution.updateOne({ id: solid }, { $pull: { likes: userid } });
      await User.updateOne({ id: userid }, { $pull: { likedsols: solid } });

      const updatedlikes = Solution.likes.filter(
        (id) => id.toString() !== userid.toString()
      );
      res.status(200).json(updatedlikes);
    } else {
      Solution.likes.push(userid);
      await User.updateOne({ id: userid }, { $push: { likedsols: solid } });
      await Solution.save();

      const updatedlikes = Solution.likes.length();
      res.status(200).json(updatedlikes);
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const commentonsolution = async (req, res) => {
  try {
    const { text } = req.body;
    const solid = req.params.id;
    const userid = req.user._id;

    const sol = Solution.findById(solid);

    if (!sol) {
      return res.status(404).json({ error: "Solution not found" });
    }

    const comment = { text: text, user: userid };

    Solution.comment.push(comment);

    await Solution.save();
    res.status(200).json(sol);
  } catch (error) {
    console.log("Error in commenting controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
