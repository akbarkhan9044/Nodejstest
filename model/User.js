const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    isAdmin:{
        type:Boolean
    }
},{timestamps:true});
userSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},"test",{expiresIn:3600});
}

module.exports=mongoose.model("User",userSchema);