const express = require("express");
const app = express();
const port = 3000;
const auth = require("./routes/auth");
require('./connection/connection')
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello form the backend")
})

app.use("/api/v1", auth)

app.listen(port, () =>{
    console.log(`server is running ${port}`)
})