import mongoose from "mongoose"

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    profilepic:{
        type:String,
    },
    bookmarked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doubt"
    },

},{timestamps:true})

const user=mongoose.model("User",userschema)
export default user