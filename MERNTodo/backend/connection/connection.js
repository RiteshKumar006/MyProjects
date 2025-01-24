const mongoose = require("mongoose");
const connectDB = async (req, res) => {
   try{
    await mongoose.connect("mongodb+srv://riteshjangra8:GI3yZHtqOmi5DQtq@cluster0.y32ca.mongodb.net/").then(()=>{
        console.log("Connected to DB")
    })
   }catch(error){
    res.status(400).json({Message: "Error in connecting to DB"})
   }
}
connectDB()