const asyncHandler=require("express-async-handler");
const Post=require("../model/Post");
const { postValidation } = require("../validation/post");
const User = require("../model/User");


const postData=asyncHandler(async(req,res)=>{
    try{
        const validation= await postValidation.validateAsync(req.body);
       console.log(validation);
        const data=await Post.create(req.body);

        if(data){
            res.status(201);
            res.json(data);
        }else{
            res.status(400);
            res.json({message:"Error while creating new Post"});
        }
    }catch(error){
        console.log(error);
        if(error.isJoi=== true){
            res.status(422);
            res.json({message:error.message});
        }else{
            res.status(400);
            res.json({message:error.message});
        }
    }

});

const postById=asyncHandler(async(req,res)=>{
    try{
        const id=req.params.id;
        console.log("iD",id);
        const  post=await Post.findById(id);
        if(post){
            res.status(200);
            res.json(post);
        }else{
            res.status(404);
            res.json({message:"No Data found"});
        }
    }catch(error){
        console.log(error);
    }
});

const allPost=asyncHandler(async(req,res)=>{
    try{
        const path=req.query.path;
        console.log(path);

   let pageNumber=2;
   let pageSize=4;
        const allData=await Post.find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
 

        if(allData){

            res.status(200);
            res.json(allData);
        }else{
            res.status(404);
            res.json({message:"No Data Found"})
        }
    }catch(error){
        console.log(error);
    }
})

const updateDocument=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const checkItem=await Post.findById(id);
    if(checkItem){
        const update=await Post.findByIdAndUpdate(id,req.body);
        const data=await Post.findById(id);
        res.status(200);
        res.json(data);
    }else{
        res.status(404);
        res.json({message:"Error while updating post"});
    }
});

const deletePost=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const post=await Post.findById(id);
    if(post){
        const deleteData=await Post.findByIdAndDelete(id);
        res.status(200)
        res.json({message:"Deleted Successfully"});
    }else{
        res.status(404);
        res.json({message:"Error Deleting Post"});
    }
});



const getCurrentUser=asyncHandler(async(req,res)=>{
    if(req.user.isAdmin === true){
        const getUser = await User.findById(req.user._id).select({ password: 0, isAdmin: 0 });
        res.status(200);
        res.json(getUser);
    }else{
        res.status(403);
         throw new Error("You are not authorized");
    }



});

module.exports={postData,postById,allPost,deletePost,updateDocument,getCurrentUser};


