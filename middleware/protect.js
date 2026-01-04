const jwt=require("jsonwebtoken");
const User=require("../model/User");
const asyncHandler=require('express-async-handler');


const protect=asyncHandler(async(req,res,next)=>{
try{
if(req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
let token=req.headers.authorization.split([" "])[1];
console.log(token);
if(token){
let decode= jwt.verify(token,"test");
req.user=await User.findById(decode.id).select("-password");
}else{
    res.status(403);
    res.json({message:"UnAuthorized"});
}

}else{
    res.status(403);
    res.json({message:"UnAuthorized"});
}
next()
}catch(error){
    res.status(403);
    res.json({message:"UnAuthorized"});
}
});
module.exports={protect};