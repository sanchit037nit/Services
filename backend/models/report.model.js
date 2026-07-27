import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
{
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Solution",
        required:true
    },

    reason:{

        type:String,
        enum:[
            "Spam",
            "Abusive",
            "Not Coding Related",
            "Duplicate"
        ],
        required:true

    }
},

{
    timestamps:true
}

);

const Report=mongoose.model("Report",reportSchema);

export default Report;