const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors")
require('./connection/connection')
const auth = require("./routes/auth");
const list =  require("./routes/list");
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("Hello form the backend")
})

app.use("/api/v1", auth)
app.use("/api/v2", list)

app.listen(port, () =>{
    console.log(`server is running ${port}`)
})