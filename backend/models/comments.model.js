import mongoose from "mongoose"

const messageschema= new mongoose.Schema({
   message:{
    type:String,
    required:true,
   },

   createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }

},
{timestamps:true})

const message=mongoose.model("Message",messageschema)
export default message