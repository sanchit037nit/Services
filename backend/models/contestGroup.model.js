import mongoose from "mongoose";

const contestGroupSchema = new mongoose.Schema({
  contestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Contest", 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    solutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Solution" }, // Optional link to a posted solution
    timestamp: { type: Date, default: Date.now }
  }],
  status: { 
    type: String, 
    enum: ["ACTIVE", "ARCHIVED"], 
    default: "ACTIVE" 
  }
}, { timestamps: true });

export const ContestGroup = mongoose.model("ContestGroup", contestGroupSchema);
