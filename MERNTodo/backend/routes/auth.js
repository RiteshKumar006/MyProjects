const router = require("express").Router();
const User = require("../models/user")


//SIGN in functionality

router.post("/register", async(req, res) =>{
    try{
        const {email,username, password} = req.body;
        const user = new User({email,username, password});
        await user.save().then(()=> res.status(200).json({user: user}))
        // console.log("user created", user)
    }catch(error){
        console.log(error)
        res?.status(400).json({error: error.message})
    }
})

module.exports = router