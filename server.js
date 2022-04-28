require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
app.listen(PORT,()=>{console.log("http://localhost:"+PORT)});
let PATH = "./data/questions.json";

let read_file = (filename) =>JSON.parse(fs.readFileSync(filename));
let write_file = (filename,data) =>fs.writeFileSync(filename,data);

let questions = read_file(PATH);

// get all questions ====================================================================
app.get("/questions",(req,res)=>{
    if (questions.length > 0){
        res.send(questions);
    }
    else
    {
        res.send("No questions yet !!")
    }
})
// get one questions ====================================================================
app.get("/questions/:id",(req,res)=>{
    let id = req.params.id
    let index = questions.findIndex(questions => questions.id === id);
    if (index !== undefined){
        res.send(questions[index])
    }
    else{
        res.send("Id not found !!")
    }
})
// add questions to quize================================================================

app.post('/questions',(req,res)=>{
    let new_question = {
        id:uuidv4(),
        title:req.body.title,
        choiceA:req.body.choiceA,
        choiceB:req.body.choiceB,
        choiceC:req.body.choiceC,
        choiceD:req.body.choiceD,
        correct:req.body.correct,
    }
    questions.push(new_question);
    let data = JSON.stringify(questions);
    write_file(PATH,data);
    res.send(questions);
})

// delete questions=====================================================================

app.delete('/questions/:id',(req,res)=>{
    let id = req.params.id;
    let index = questions.findIndex(questions => questions.id === id);
    if(index != -1){
        questions.splice(index, 1);
        res.send({"message": "you have deleted"})
    }
    else{
        res.status(404).send({"message": "Id not found"});
    }
    let data = JSON.stringify(questions);
    write_file(PATH,data);
})

// update questions================================================================

app.path('/questions/:id',(req,res)=>{
    let id = req.params.id;
    let index = questions.findIndex(questions => questions.id === id);
    questions[index].choiceA =req.body.title;
    questions[index].choiceA =req.body.choiceA;
    questions[index].choiceB =req.body.choiceB;
    questions[index].choiceC =req.body.choiceC;
    questions[index].choiceD =req.body.choiceD;
    questions[index].correct =req.body.correct;
    let data = JSON.stringify(questions);
    write_file(PATH,data);
})

app.use(express.static("./public"))