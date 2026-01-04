const  express=require("express");
const router=express();
const { login, registerUser }=require("../constroller/user-controller");

router.post("/login",login);
router.post("/register",registerUser);

module.exports=router;
