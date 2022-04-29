require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin:"*"
}))
const { v4: uuidv4 } = require('uuid');
app.listen(PORT,()=>{console.log("http://localhost:"+PORT)});
app.use(express.static("./public"));
let questions = require("./routes/question_route")
app.use("/questions",questions);
