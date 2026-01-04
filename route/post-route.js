const express=require("express");
const router=express();
const {protect}=require("../middleware/protect");
const {postData,postById, allPost,updateDocument,deletePost,getCurrentUser}=require("../constroller/post-controller");



router.get("/",allPost);
router.get("/me",protect,getCurrentUser);
router.get("/:id",postById);
router.post("/",postData);
router.delete("/:id",deletePost);
router.put("/:id",updateDocument);


module.exports=router;