

let myURL = "http://localhost";

function refrest_Dom(){  
    let container = document.querySelector('.container');
    axios.get(myURL+ "/questions").then(function(respont){
        let questions = respont.data;
        if(questions !== "No questions yet !!"){
            let list_of_question = document.querySelector(".questionsList");
            list_of_question.remove();
            
            console.log(list_of_question);
            console.log(questions);
            let questionsList = document.createElement('div');
            questionsList.className = "questionsList";
            for(let question of  questions){
        
                // card ============
                let card = document.createElement('div');
                card.className = "card w-50 p-3 m-auto mt-3";
                card.id = question.id;
                console.log(question.id);
        
                // title=============
                let questiontitle = document.createElement('p');
                questiontitle.className = "questiontitle"
                questiontitle.textContent = question.title;
                
        
                // card list===========
                let card_list = document.createElement('div');
                card_list.className = "card_list";
        
                // choice a==========
                let answer_a = document.createElement('div');
                answer_a.className = "answer d-flex justify-content-between"
                let choiceA = document.createElement('p');
                choiceA.textContent = question.choiceA;
                answer_a.appendChild(choiceA);
        
                // choice b ==========
                let answer_b = document.createElement('div');
                answer_b.className = "answer d-flex justify-content-between";
                let choiceB = document.createElement('p');
                choiceB.textContent = question.choiceB;
                answer_b.appendChild(choiceB);
        
                // choice c ==========
                let answer_c = document.createElement('div');
                answer_c.className = "answer d-flex justify-content-between";
                let choiceC = document.createElement('p');
                choiceC.textContent = question.choiceC;
                answer_c.appendChild(choiceC);
        
                // choice d ==========
                let answer_d = document.createElement('div');
                answer_d.className = "answer d-flex justify-content-between";
                let choiceD = document.createElement('p');
                choiceD.textContent = question.choiceD;
                answer_d.appendChild(choiceD);
                // check correct answer========
                if (question.correct=="A"){
                    answer_a.style.color='#55a630';
                    answer_a.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "7%";
                    answer_a.appendChild(img);
                  }
                  else if (question.correct=="B"){
                    answer_b.style.color='#55a630';
                    answer_b.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "7%";
                    answer_b.appendChild(img);
                  }
                  else if (question.correct=="C"){
                    answer_c.style.color='#55a630';
                    answer_c.style.fontWeight = "bold";
                    answer_c.style.textDecoration = "bol"
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "7%";
                    answer_c.appendChild(img);
                  }
                  else if (question.correct=="D"){
                    answer_d.style.color='#55a630';
                    answer_d.style.fontWeight = "bold";
                    let img = document.createElement('img');
                    img.src = "../../images/correct.jpg";
                    img.style.width = "7%";
                    answer_d.appendChild(img);
                  }
                // btn delete and btn edit==========
                let btn = document.createElement('div');
                btn.className = "btn w-100 d-flex justify-content-end";
                let a = document.createElement('a');
                a.href = "../../index.html";
                let edit_tbn = document.createElement('button');
                edit_tbn.className = "edit_btn btn-success me-2";
                edit_tbn.textContent = "Edit";
                let delete_btn = document.createElement('button');
                delete_btn.className = "delete_btn btn-danger";
                delete_btn.textContent = "delete";
                
                card.appendChild(questiontitle);
                card_list.appendChild(answer_a);
                card_list.appendChild(answer_b);
                card_list.appendChild(answer_c);
                card_list.appendChild(answer_d);
                card.appendChild(card_list);
                a.appendChild(edit_tbn);
                btn.appendChild(a);
                btn.appendChild(delete_btn)
                card.appendChild(btn);
                questionsList.appendChild(card);
                container.appendChild(questionsList);
            }
        }
    })
}

function deleteQuestion(e){
    if (e.target.className==="delete_btn btn-danger"){
        console.log(e.target.parentElement.parentElement.id);
        let id = e.target.parentElement.parentElement.id;
        axios.delete(myURL + "/questions/"+id);
        refrest_Dom();
    }
}
function onAddQuestion(){  
    questions_dialog.style.display = "block";
}

function onCancel(){
    questions_dialog.style.display = "none";
}

function onCreate(){
    let title = document.getElementById('title');
    let choiceA = document.getElementById('choiceA');
    let choiceB = document.getElementById('choiceB');
    let choiceC = document.getElementById('choiceC');
    let choiceD = document.getElementById('choiceD');
    let corect_answer = document.querySelector('.corect');
    let new_question = {
        title: title.value,
        choiceA: choiceA.value,
        choiceB: choiceB.value,
        choiceC: choiceC.value,
        choiceD: choiceD.value,
        correct: corect_answer.value
    }
    axios.post(myURL + "/questions", new_question);
    questions_dialog.style.display = "none";
    refrest_Dom();
}
// -----------------------main code ------------------------------

let questions_dialog = document.querySelector('#questions-dialog');
document.addEventListener("click",deleteQuestion);


refrest_Dom();