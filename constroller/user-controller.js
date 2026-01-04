const User=require("../model/User");
const asyncHandler=require("express-async-handler");
const bcrypt = require('bcrypt');

const registerUser=asyncHandler(async(req,res)=>{
    const {email,password,name,isAdmin}=req.body;
    const checkUserNotAlreadyRegister=await User.findOne({email});
    if(checkUserNotAlreadyRegister){
        res.status(404);
        throw new Error("User already register");

    }else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const createUser=await User.create({
            email,
            password:hash,
            name,
            isAdmin
        });
        if(createUser ){
            res.status(201);
            res.header('x-auth-token', createUser.generateAuthToken())
            res.json({
                email:createUser.email,
                name:createUser.name,
                token:createUser.generateAuthToken()
            });

        }else{
            res.status(404);
            res.json({message:"Error while registering user"});
        }
    }

});
const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const checkUserAlready=await User.findOne({email});
    if(checkUserAlready && await bcrypt.compareSync(password,checkUserAlready.password)){
        res.status(200);
        res.json({
            email:checkUserAlready.email,
            name:checkUserAlready.name,
            token:checkUserAlready.generateAuthToken()
        })
    
    }else{
        res.status(404);
        res.json({message:"Please register user first"});
    }

});




module.exports={registerUser,login};


