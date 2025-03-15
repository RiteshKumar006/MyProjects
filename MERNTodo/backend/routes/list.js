const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const { json } = require("express");
const { default: mongoose } = require("mongoose");

//create task
router.post("/addTask", async (req, res) => {
  try {
    console.log("response", req.body)
    const { title, id, body } = req.body;

    const existingUser = await User.findById(id);
    console.log("existingUser", existingUser)
    if (existingUser) {
      console.log("in if")
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update title

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body.inputs;
      const list = await List.findByIdAndUpdate(req.params.id, { title, body },{ new: true } );
      console.log("list", list)
      if(!list){
        res.status(200).json({message: "Task not found"})
      }
     res.status(200).json({message: "Task Updated"});
  } catch (error) {
    console.log(error);
  }
});

//delete task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
      const { id} = req.body;
      console.log("res", id,  "  ", req.params.id)
  
      const existingUser = await User.findOneAndUpdate( 
        { _id: id }, // Corrected field
        { $pull: { list: req.params.id } },
        { new: true } );
      // console.log("existingUser", existingUser)
      if (existingUser) {
          // console.log('find user',req.params.id)
        // const list = new List({title, body, user: existingUser })
        await List.findByIdAndDelete(req.params.id ).then(() => res.status(200).json({message: "Task deleted"}))
      }
    } catch (error) {
      console.log(error);
    }
  });

  //getTask
  router.get("/getTasks/:id",async(req, res)=>{
    try{
    const list = await List.find({user: req.params.id}).sort({createdAt: 1});
    // const taskList = JSON.stringify(list)
    if(list.length !== 0){
    res.status(200).json({list})
    // console.log("lit", list)
  }
    else{
        res.status(200).json({message: "No Task"})
    }
  } catch(err){
    res.status(200).json({message: "Not logged in"})
  }

  })
module.exports = router;
