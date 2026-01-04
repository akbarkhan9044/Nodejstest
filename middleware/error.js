const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    if(err.isJoi===true){
        res.status(422);
    }else{
    res.status(statusCode);
    }
    res.json({message:err.message});
}

module.exports={errorHandler}