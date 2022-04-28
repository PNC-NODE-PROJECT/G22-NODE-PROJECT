require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
app.listen(PORT,()=>{console.log("http://localhost:"+PORT)});


let questions = require("./routes/question_route")
app.use("/questions",questions);