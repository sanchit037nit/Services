import mongoose from "mongoose"

const messageschema= new mongoose.Schema({
   message:{
    type:String,
    required:true,
   },

   createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },

   createdfor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Solution"
   },
},
{timestamps:true})

const message=mongoose.model("Message",messageschema)
export default message