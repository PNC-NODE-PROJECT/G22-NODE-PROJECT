

// FUNCTION REFREST DOM ===========================================================

function refrest_Dom(){  
  let container = document.querySelector('.container');
  axios.get("/questions").then(function(respont){
        let corections=JSON.parse(localStorage.getItem("corections"));
        console.log(corections);
        let questions = respont.data;
        if(questions !== "No questions yet !!"){
            let list_of_question = document.querySelector(".questionsList");
            list_of_question.remove();
            let questionsList = document.createElement('div');
            questionsList.className = "questionsList";
            for(let question of  questions){

                // card ============================================================

                let card = document.createElement('div');
                card.className = "card w-50 p-3 m-auto mt-3";
                card.id = question.id;
        
                // title============================================================

                let questiontitle = document.createElement('p');
                questiontitle.className = "questiontitle"
                questiontitle.textContent = question.title;
                
        
                // card list=========================================================

                let card_list = document.createElement('div');
                card_list.className = "card_list";
        
                // choice a==========================================================

                let answer_a = document.createElement('div');
                answer_a.className = "answerA d-flex justify-content-between"
                let choiceA = document.createElement('p');
                choiceA.textContent = question.choiceA;
                answer_a.appendChild(choiceA);
        
                // choice b ===========================================================

                let answer_b = document.createElement('div');
                answer_b.className = "answerB d-flex justify-content-between";
                let choiceB = document.createElement('p');
                choiceB.textContent = question.choiceB;
                answer_b.appendChild(choiceB);
        
                // choice c ============================================================

                let answer_c = document.createElement('div');
                answer_c.className = "answerC d-flex justify-content-between";
                let choiceC = document.createElement('p');
                choiceC.textContent = question.choiceC;
                answer_c.appendChild(choiceC);
        
                // choice d =============================================================

                let answer_d = document.createElement('div');
                answer_d.className = "answerD d-flex justify-content-between";
                let choiceD = document.createElement('p');
                choiceD.textContent = question.choiceD;
                answer_d.appendChild(choiceD);

                // check correct answer===================================================
              
                // IF CORRECT ANSWER IS A-------------------------
                let goodDomAnswer =null;
                if (question.correct=="A"){
                    goodDomAnswer = answer_a;
                }
                else if (question.correct=="B"){
                    goodDomAnswer = answer_b;
                }
                else if (question.correct=="C"){
                    goodDomAnswer = answer_c;
                }
                else {
                    goodDomAnswer = answer_d;
                }

                goodDomAnswer.style.color='#55a630';
                goodDomAnswer.style.fontWeight = "bold";
                let img = document.createElement('img');
                img.src = "../../images/correct.jpg";
                img.style.width = "7%";
                goodDomAnswer.appendChild(img);

                  // CHECK THE WRONG ANSWER =================================================

                  let index = corections.findIndex((correct)=>correct.id===question.id);
                  let badDomAnswer =null;
                  if (corections[index].choice==="A" && question.correct!=="A"){
                    badDomAnswer = answer_a;
                  }
                  else if (corections[index].choice==="B" && question.correct!=="B"){
                    badDomAnswer = answer_b;
                  }
                  else if (corections[index].choice==="C" && question.correct!=="C"){
                    badDomAnswer = answer_c;
                  }
                  else if (corections[index].choice==="D" && question.correct!=="D"){
                    badDomAnswer = answer_d;
                  }
                  if(badDomAnswer !== null){
                    badDomAnswer.style.color="red";
                    let wrongimg = document.createElement('img');
                    wrongimg.src = "../../images/wrong.jpg";
                    img.style.width = "7%";
                    badDomAnswer.appendChild(wrongimg);
                  }
                // APEND ELEMENT TO THE DOM ===================================================

                card.appendChild(questiontitle);
                card_list.appendChild(answer_a);
                card_list.appendChild(answer_b);
                card_list.appendChild(answer_c);
                card_list.appendChild(answer_d);
                card.appendChild(card_list);
                questionsList.appendChild(card);
                container.appendChild(questionsList);
            }
        }
    })
}
// REFREST DOM=====================================================================================
refrest_Dom()