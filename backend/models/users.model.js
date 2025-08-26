import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      unique: true,
    },

    profilephoto: {
      type: String,
      default: "",
    },

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
        default: [],
      },
    ],

    likedsols: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
        default: [],
      },
    ],
    doubts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const user = mongoose.model("User", userschema);
export default user;
