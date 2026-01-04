const mongoose=require("mongoose");

const connectDb=async()=>{
    try{
        const connections=await mongoose.connect(process.env.DB);
        console.log(`Database has been connected ${connections.connection.host}`)
    }catch(error){
        console.log(`Error while connecting to Database ${error}`)
    }
}

module.exports=connectDb;