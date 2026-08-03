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

    photo: {
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

    reportCount:{
    type:Number,
    default:0
    },

   isHidden:{
    type:Boolean,
    default:false
    },
   
   aiModeration: {
    riskScore: {
        type: Number,
        default: 0
    },

    verdict: {
        type: String,
        enum: ["Safe", "Review", "Blocked"],
        default: "Safe"
    },

    explanation: {
        type: String,
        default: ""
    },

    spam: {
        type: Number,
        default: 0
    },

    fraud: {
        type: Number,
        default: 0
    },

    toxicity: {
        type: Number,
        default: 0
    },

    advertisement: {
        type: Number,
        default: 0
    },

    malware: {
        type: Number,
        default: 0
    },

    duplicate: {
        type: Number,
        default: 0
    },

    moderatedAt: Date
},

  },
  { timestamps: true }
);

const solution = mongoose.model("Solution", doubtschema);
export default solution;
