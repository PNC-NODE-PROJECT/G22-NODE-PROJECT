require("dotenv").config();
let express = require("express");
let fs = require("fs");
let app = express();
let PORT = process.env.PORT || 3000
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
app.listen(PORT,()=>{console.log("http://localhost:"+PORT)});
let PATH = "./data/questions.json";
let questions = JSON.parse(fs.readFileSync(PATH));

app.get("/questions",(req,res)=>{
    res.send(questions);
})

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
    res.send(questions);
})

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
    
})

