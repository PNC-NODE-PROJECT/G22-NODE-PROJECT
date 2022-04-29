const fs = require('fs');
let PATH = "./data/questions.json";

let read_file = (filename) =>JSON.parse(fs.readFileSync(filename));
let write_file = (filename,data) =>fs.writeFileSync(filename,data);

let questions = read_file(PATH);


// FUNTIONS GET ALL QUESTIONS==================================================
function GetAllQuestions() {
    if (questions.length > 0){
        return questions;
    }
    else
    {
        return ("No questions yet !!");
    }
}

// FUNTIONS GET ONE QUESTION ==================================================
function Get_One_Questions(id) {
    let index = questions.findIndex(questions => questions.id === id);
    if (index !== undefined){
        return (questions[index]);
    }
    else{
        return("Id not found !!");
    }
}
// FUNTIONS DELETE ONE QUESTION ===============================================
function delete_One_Question(id) {
    let index = questions.findIndex(questions => questions.id === id);
    if(index != -1){
        questions.splice(index, 1);
        let data = JSON.stringify(questions);
        write_file(PATH,data)
        return({"message": "you have deleted"})
    }
    else{
        return({"message": "Id not found"});
    }
}
// FUNTIONS CREATE QUESTION ===================================================
function create_Question(add_data) {
    questions.push(add_data);
    let data = JSON.stringify(questions);
    write_file(PATH,data)
    return (questions);
}
// FUNTIONS UPDATE QUESTION ===================================================
function Updat_Questions(id,body) {
    console.log(body);
    let index = questions.findIndex(questions => questions.id === id);
    questions[index].title =body.title;
    questions[index].choiceA =body.choiceA;
    questions[index].choiceB =body.choiceB;
    questions[index].choiceC =body.choiceC;
    questions[index].choiceD =body.choiceD;
    questions[index].correct =body.correct;
    let data = JSON.stringify(questions);
    write_file(PATH,data)
}


module.exports.GetAllQuestions = GetAllQuestions;
module.exports.Get_One_Questions =Get_One_Questions;
module.exports.delete_One_Question = delete_One_Question;
module.exports.create_Question = create_Question;
module.exports.Updat_Questions =  Updat_Questions;