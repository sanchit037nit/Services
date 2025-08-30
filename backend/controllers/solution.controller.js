
import Solution from "../models/solution.model.js";
import User from "../models/users.model.js";
import { GoogleGenAI } from "@google/genai";
import cloudinary from "../utils/cloudinary.js"

export const createsol = async (req, res) => {
  const { doubt, description, language, platform, createdby,code , link,photo} = req.body;
  const userid=req.user._id.toString()
   const user=await User.findById(userid)
    const upres=await cloudinary.uploader.upload(photo)
  try {
    const newsol = new Solution({
      doubt: doubt,
      description: description,
      code:code,
      link:link,
      language: language,
      platform: platform,
      photo:upres.secure_url,
      createdby,
    });

    if (newsol) {
      
       user.doubts?.push(newsol)
       await user.save()
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
  const {id} = req.params
   const userid=req.user._id.toString()
   const user=await User.findById(userid)

  try {
    if (!id) {
      return res.status(400).json({ message: "text is required" });
    }
    // console.log(id)
       
    const delsol = await Solution.findByIdAndDelete(id);
    user.doubts=user.doubts.filter(doubt => doubt._id.toString()!==id.toString())
    user.bookmarks=user.bookmarks.filter(doubt => doubt._id.toString()!==id.toString())
    user.likedsols=user.likedsols.filter(doubt => doubt._id.toString()!==id.toString())
    await user.save()

    if (delsol) {
      return res.status(201).json({
        success: true,
        message: "comment deleted",
      });
    } 
  } catch (error) {
    console.log("error in deleting solution",error);
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

export const getsolbyid = async (req, res) => {
  try {
    const userid = req.user._id
    const sols = await Solution.find({createdby:userid});

    return res.status(200).json({ sols });
  } catch (error) {
    console.log("error in getting solutions", error);
    return res.status(400).json({
      message: "error in getting solutions",
    });
  }
};

export const getsol = async (req, res) => {
  try {
    const sols = await Solution.find().populate("createdby","name email profilephoto");

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
    const userid = req.user._id.toString();
    const { id: solid } = req.params;
 
    const sol = await Solution.findById(solid);

    if (!sol) {
      return res.status(404).json({ error: "Solution not found" });
    }

    const userbookmarkedsol =  sol.bookmarkedby.includes(userid);
      const user=await User.findById(userid)

    if (userbookmarkedsol) {
      await Solution.updateOne(
        { _id: solid },
        { $pull: { bookmarkedby: userid } }
      );
      await User.updateOne({ _id: userid }, { $pull: { bookmarks: solid } });

   
      const updatedbookmarks = user.bookmarks
      return res.status(200).json(updatedbookmarks);
    } else {

      sol.bookmarkedby.push(userid);
      await User.updateOne({ _id: userid }, { $push: { bookmarks: solid } });
      await sol.save();

      const updatedbookmarks = user.bookmarks;
      return res.status(200).json(updatedbookmarks);
    }
  } catch (error) {
    console.log("Error in bookmark controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const likeunlike = async (req, res) => {
  try {
    
    const userid = req.user._id.toString();

    const { id } = req.params;
  
    const sol = await Solution.findById(id);
     
    if (!sol) {
      return res.status(404).json({ error: "Solution not found" });
    }

    const userlikedsol = sol.likes.includes(userid);

    if (userlikedsol) {
      await Solution.updateOne({ _id: id }, { $pull: { likes: userid } });
      await User.updateOne({ _id: userid }, { $pull: { likedsols: id } });

      const updatedlikes= sol.likes.filter(
        (id) => id.toString() !== userid.toString()
      );

   
      res.status(200).json(updatedlikes);
    } else {
      sol.likes.push(userid);
      await User.updateOne({ _id: userid }, { $push: { likedsols: id } });
      await sol.save();

      const updatedlikes = sol.likes;
 
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
    const userid = req.user._id.toString();

    const sol = await Solution.findById(solid);
  
    if (!sol) {
       res.status(404).json({ error: "Solution not found" });
    }

    const comment = { text: text, user: userid };
    sol.comments.push(comment);
    await sol.save();
     res.status(200).json(sol);
     
  } 
  catch (error) {
    console.log("Error in commenting controller: ", error);
     res.status(400).json({ error: "Internal server error" });
  }
};

export const getbookmarks = async (req, res) => {
  try {
  
    const id=req.user._id.toString()
    const user=await User.findById(id)
     if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const books= await user.populate("bookmarks")
    // console.log(books)
    return res.status(200).json(books);
  } catch (error) {
    console.log("error in getting bookmarks", error);
    return res.status(400).json({
      message: "error in getting bookmarks",
    });
  }
};

export const sendMessage= async(req,res)=>{
				const {data} = req.body
				// res.status(200).json({
        //   message:"skfsf"
        // })
				try {
					// const response = await fetch(
					// 	"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
					// 	{
					// 		method: 'POST',
					// 		headers: {
					// 			Authorization:`Bearer ${process.env.GEMINI_API_KEY}`,

					// 			'Content-Type': 'application/json',
					// 		},
					// 		body: JSON.stringify({
					// 			model: 'gemini-2.0-flash',
					// 			messages: [{ role: 'user', content: data }],
          //     }),
          //   }
          // )
  // "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  // {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     contents: [
  //       {
  //         role: "user",
  //         parts: [{ text: data }],
  //       },
  //     ],
  //   }),
  // }
            // )

//             const response = await fetch(
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
//   {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: data }],
//         },
//       ],
//     }),
//   }
// );
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
 const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data,
  });
					// const dat = await response.json();
            //  console.log(response.text)
					const markdownText =
						response.text || 'No response received.';
		      return res.status(200).json({
            message:markdownText
          })
				} catch (error) {
				  res.status(400).json({
            message:"error in ai"
          })
				}
			}
