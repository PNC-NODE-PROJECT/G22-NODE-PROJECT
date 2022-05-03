const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let PATH = "./data/questions.json";

let read_file = (filename) => JSON.parse(fs.readFileSync(filename));
let write_file = (filename, data) => fs.writeFileSync(filename, data);

let questions = read_file(PATH);

let model_question = require("../model/model.js");

// get all questions ====================================================================
router.get("/", (req, res) => {
    res.send(model_question.get_all_questions())
})
// get one questions ====================================================================
router.get("/:id", (req, res) => {
    let id = req.params.id
    res.send(model_question.Get_One_Questions(id));
})
// add questions to quize================================================================

router.post('/', (req, res) => {
    if(req.body.title !== "" && req.body.choiceA !== "" && req.body.choiceB !== "" && req.body.choiceC !== "" && req.body.choiceD !== ""){
        let new_question = {
            id: uuidv4(),
            title: req.body.title,
            choiceA: req.body.choiceA,
            choiceB: req.body.choiceB,
            choiceC: req.body.choiceC,
            choiceD: req.body.choiceD,
            correct: req.body.correct,
        }
       model_question.create_Question(new_question)
       res.send("add success")
    }
    else{
        res.send("can not add question !")
    }
})

// delete questions=====================================================================

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let errorMEssage = model_question.delete_question(id);

    if (errorMEssage === null) {
        res.send(200, { message: 'success' })
    }
    else {
        res.send(404, { message: errorMEssage });
    }
})

// update questions================================================================

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let mybody = req.body;
    if(req.body.title !== "" && req.body.choiceA !== "" && req.body.choiceB !== "" && req.body.choiceC !== "" && req.body.choiceD !== "") {
        model_question.updat_questions(id, mybody)
        res.send("update success");
    }
    else {
        res.send("update error");
    }
})



module.exports = router;