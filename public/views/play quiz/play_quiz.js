
// get the dom from html================================================

const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choiceA = document.getElementById("A");
const dom_choiceB = document.getElementById("B");
const dom_choiceC = document.getElementById("C");
const dom_choiceD = document.getElementById("D");

const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");


let currentQuestionIndex = 0;



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
  currentQuestionIndex+=1;
  console.log(currentQuestionIndex);
  renderQuestion();
}

