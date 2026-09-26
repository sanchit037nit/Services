import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  platform: { 
    type: String, 
    required: true 
  }, // e.g., 'LeetCode', 'Codeforces', 'CodeChef'
  contestName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  url: { 
    type: String 
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["UPCOMING", "ACTIVE", "ARCHIVED"], 
    default: "UPCOMING" 
  }
}, { timestamps: true });

export const Contest = mongoose.model("Contest", contestSchema);
