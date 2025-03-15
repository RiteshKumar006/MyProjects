const router = require("express").Router();
const User = require("../models/user")
const bcyptjs = require("bcryptjs")


//SIGN in functionality

router.post("/register", async(req, res) =>{
    try{
        const {email,username, password} = req.body;
        const hashPassword = bcyptjs.hashSync(password)
        const user = new User({email,username, password: hashPassword});
        await user.save().then(()=> res.status(200).json({message: "User created"}))
        // console.log("user created", user)
    }catch(error){
        console.log(error)
        res?.status(200).json({message:"User already exists"})
    }
})


router.post("/singin", async(req,res)=>{
    try{
        const userFound = await User.findOne({email: req.body.email})
    console.log("req", JSON.stringify(req.body), userFound?.password)
    if(!userFound){
        res.status(200).json({message: "Please Signup first"})
    }

    const isPasswordCorrect = bcyptjs.compareSync(req?.body?.password, userFound?.password)
    if(!isPasswordCorrect){
        res.status(400).json({message: "Please enter a valid password"})
    }

    const {password, ...others} = userFound._doc;
    res.status(200).json({others})
    }catch(error){
        console.log(error)
    }
})

module.exports = router