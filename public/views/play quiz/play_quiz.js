
// get the dom from html================================================

const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choiceA = document.getElementById("A");
const dom_choiceB = document.getElementById("B");
const dom_choiceC = document.getElementById("C");
const dom_choiceD = document.getElementById("D");

const dom_score = document.getElementById("score");
let message = document.querySelector('.message');
const dom_card = document.querySelector(".main-card");


let currentQuestionIndex = 0;
let score = 0;
let corections=[];

function hide(element) {
    element.style.display = "none";
  };
  
  // Show a given element
  function show(element) {
    element.style.display = "block";
  };

dom_start.addEventListener("click", (event) => {
    hide(dom_start);
    show(dom_quiz);
    renderQuestion();
});


function renderQuestion() {
  axios.get("http://localhost/questions").then(function(response) {
    let questions=response.data;
      if (currentQuestionIndex<=questions.length-1) {
        let question = questions[currentQuestionIndex];
        dom_question.textContent = question.title;
        dom_choiceA.textContent = question.choiceA;
        dom_choiceB.textContent = question.choiceB;
        dom_choiceC.textContent = question.choiceC;
        dom_choiceD.textContent = question.choiceD;
      }
  })
}

function checkAnswer(choice) {
  axios.get("http://localhost/questions").then(function(response) {
    var questions=response.data;
    corections.push({id: questions[currentQuestionIndex].id,choice:choice});
    localStorage.setItem("corections",JSON.stringify(corections));
    if(currentQuestionIndex<=questions.length-1){
      if(choice===questions[currentQuestionIndex].correct){
        console.log(questions[currentQuestionIndex].correct);
        score+=1;
        console.log(score);
      }
      currentQuestionIndex+=1;
    }
    if(currentQuestionIndex===questions.length){
      hide(dom_quiz);
      show(dom_card);
      dom_score.textContent=parseInt(score/questions.length*100)+"%";
      console.log(dom_score);
      if(parseInt(score/questions.length*100) == 50){
        message.textContent = "You get a goot score.But try to be more"
      }else if(parseInt(score/questions.length*100) < 50){
        message.textContent = "You need to review your lesson again!"
      }
    
    }
    
  })

  // write choice to the file ===============================================================================

  renderQuestion();
}
renderQuestion();
