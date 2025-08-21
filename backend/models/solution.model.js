import mongoose from "mongoose";

const doubtschema = new mongoose.Schema(
  {
    doubt: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    code:{
        type:String,
    },
    
    link:{
        type:String,
    },

    language: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      default: "",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    bookmarkedby: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],

    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const solution = mongoose.model("Solution", doubtschema);
export default solution;
