import mongoose from "mongoose"

const doubtschema= new mongoose.Schema({
    doubt:{
        type:String,
        required:true,
    },

    language:{
        type:String,
        required:true,
    },

    platform:{
        type:String,
        required:true,
    },

    pic:{
        type:String,
    },

    likes:{
        type:Number,
    },

    code:{
        type:Number,
    },


},{timestamps:true})

const doubt=mongoose.model("Doubt",doubtschema)
export default doubt