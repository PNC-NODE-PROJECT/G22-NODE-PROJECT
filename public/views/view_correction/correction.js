let myURL = "http://localhost";
function refrest_Dom(){  
  let container = document.querySelector('.container');
  axios.get(myURL+ "/questions").then(function(respont){
        let corections=JSON.parse(localStorage.getItem("corections"));
        console.log(corections);
        let questions = respont.data;
        if(questions !== "No questions yet !!"){
            let list_of_question = document.querySelector(".questionsList");
            list_of_question.remove();
            let questionsList = document.createElement('div');
            questionsList.className = "questionsList";
            for(let question of  questions){
                // card ============
                let card = document.createElement('div');
                card.className = "card w-50 p-3 m-auto mt-3";
                card.id = question.id;
        
                // title=============
                let questiontitle = document.createElement('p');
                questiontitle.className = "questiontitle"
                questiontitle.textContent = question.title;
                
        
                // card list===========
                let card_list = document.createElement('div');
                card_list.className = "card_list";
        
                // choice a==========
                let answer_a = document.createElement('div');
                answer_a.className = "answerA d-flex justify-content-between"
                let choiceA = document.createElement('p');
                choiceA.textContent = question.choiceA;
                answer_a.appendChild(choiceA);
        
                // choice b ==========
                let answer_b = document.createElement('div');
                answer_b.className = "answerB d-flex justify-content-between";
                let choiceB = document.createElement('p');
                choiceB.textContent = question.choiceB;
                answer_b.appendChild(choiceB);
        
                // choice c ==========
                let answer_c = document.createElement('div');
                answer_c.className = "answerC d-flex justify-content-between";
                let choiceC = document.createElement('p');
                choiceC.textContent = question.choiceC;
                answer_c.appendChild(choiceC);
        
                // choice d ==========
                let answer_d = document.createElement('div');
                answer_d.className = "answerD d-flex justify-content-between";
                let choiceD = document.createElement('p');
                choiceD.textContent = question.choiceD;
                answer_d.appendChild(choiceD);
                // check correct answer=========================================
              
                // IF CORRECT ANSWER IS A-------------------------

                if (question.correct=="A"){
                    answer_a.style.color='#55a630';
                    answer_a.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "8%";
                    answer_a.appendChild(img);
                  }
                  // IF CORRECT ANSWER IS B-------------------------
                  else if (question.correct=="B"){
                    answer_b.style.color='#55a630';
                    answer_b.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "8%";
                    answer_b.appendChild(img);
                  }
                  // IF CORRECT ANSWER IS C-------------------------
                  else if (question.correct=="C"){
                    answer_c.style.color='#55a630';
                    answer_c.style.fontWeight = "bold";
                    answer_c.style.textDecoration = "bol"
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "8%";
                    answer_c.appendChild(img);
                  }
                  // IF CORRECT ANSWER IS D-------------------------
                  else if (question.correct=="D"){
                    answer_d.style.color='#55a630';
                    answer_d.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "8%";
                    answer_d.appendChild(img);
                  }
                  let index = corections.findIndex((correct)=>correct.id===question.id);
                  console.log(corections[index].choice);
                  if (corections[index].choice==="A" && corections[index].chioce !== question.correct){
                      answer_a.style.color="red";
                      let img = document.createElement('img');
                      img.src = "../../images/wrong.jpg";
                      img.style.width = "6%";
                      answer_a.appendChild(img);
                  }
                  else if (corections[index].choice==="B" && corections[index].chioce !== question.correct){
                      answer_b.style.color="red";
                      let img = document.createElement('img');
                      img.src = "../../images/wrong.jpg";
                      img.style.width = "6%";
                      answer_b.appendChild(img);
                  }
                  else if (corections[index].choice==="C" && corections[index].chioce !== question.correct){
                      answer_c.style.color="red";
                      let img = document.createElement('img');
                      img.src = "../../images/wrong.jpg";
                      img.style.width = "6%";
                      answer_c.appendChild(img);
                  }
                  else if (corections[index].choice==="D" && corections[index].chioce !== question.correct){
                      answer_d.style.color="red";
                      let img = document.createElement('img');
                      img.src = "../../images/wrong.jpg";
                      img.style.width = "6%";
                      answer_d.appendChild(img);
                  }
                // APEND ELEMENT TO THE DOM ======================================
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
refrest_Dom()