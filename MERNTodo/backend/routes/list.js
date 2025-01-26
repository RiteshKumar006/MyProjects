const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const { json } = require("express");

//create task
router.post("/addTask", async (req, res) => {
  try {
    const { title, email, body } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
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
    const { title, email, body } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('find user',req.params.id)
      // const list = new List({title, body, user: existingUser })
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list .save().then(() => res.status(200).json({message: "Task Updated"}));
    }
  } catch (error) {
    console.log(error);
  }
});

//delete task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
      const { email} = req.body;
  
      const existingUser = await User.findOneAndDelete({ email }, {$pull: {list : req.params.id}});
      if (existingUser) {
          console.log('find user',req.params.id)
        // const list = new List({title, body, user: existingUser })
        await List.findByIdAndDelete(req.params.id ).then(() => res.status(200).json({message: "Task deleted"}))
      }
    } catch (error) {
      console.log(error);
    }
  });

  //getTask
  router.get("/getTasks/:id",async(req, res)=>{
    const list = await List.find({user: req.params.id}).sort({createdAt: 1});
    // const taskList = JSON.stringify(list)
    if(list.length !== 0){
    res.status(200).json({list})
    console.log("lit", list)}
    else{
        res.status(200).json({message: "N o Task"})
    }

  })
module.exports = router;
