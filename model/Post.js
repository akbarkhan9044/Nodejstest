const { ref } = require("joi");
const mongoose=require("mongoose");


const postSchema=mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    price:{
        type:Number
    },
    tag:{
        type:String,
        required:true
    }

},{timestamps:true});


module.exports=mongoose.model("post",postSchema);