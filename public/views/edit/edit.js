

function refrest_Dom(){  
    let container = document.querySelector('.container');

    axios.get("/questions").then(function(respont){
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

 
                // btn delete and btn edit===================================
                let btn = document.createElement('div');
                btn.className = "btn w-100 d-flex justify-content-end";
               
                let edit_tbn = document.createElement('button');
                edit_tbn.className = "edit_btn btn-success me-2";
                edit_tbn.textContent = "Edit";
                edit_tbn.addEventListener('click', () => { 
                    onEditQuestion(question.id);
                });


                let delete_btn = document.createElement('button');
                delete_btn.className = "delete_btn btn-danger";
                delete_btn.textContent = "delete";
                delete_btn.addEventListener('click', () => { 
                    onDeleteQuestion(question.id);
                });



                // APEND ELEMENT TO THE DOM ======================================
                card.appendChild(questiontitle);
                card_list.appendChild(answer_a);
                card_list.appendChild(answer_b);
                card_list.appendChild(answer_c);
                card_list.appendChild(answer_d);
                card.appendChild(card_list);
                btn.appendChild(edit_tbn);
                btn.appendChild(delete_btn)
                card.appendChild(btn);
                questionsList.appendChild(card);
                container.appendChild(questionsList);
            }
        }
    })
}
// funtion erorr===================================================
function error(element){
    element.style.border = 1 + "px solid red";
}

// funtion completed =============================================
function completed(element){
    element.style.border = 1 + "px solid black";
}

// function show =======================================================

function show(element){
    element.style.display="block";
}

// function hide =======================================================

function hide(element){
    element.style.display="none";
}

// FUNTION DELETE QUESTION ============================================

function onDeleteQuestion(id){
        axios.delete("/questions/"+id)
        .then( res=> refrest_Dom());
}

// FUNTION ADD NEW QUESTION ==========================================

function onAddQuestion(e){  
    edit_mode = "Edite";
    showEditDialog();
 

}

function showEditDialog(){

    // 1 - Update the button of the dialog
    let createEditButton = document.querySelector("#createEditButton");
    if (edit_mode === "Create") {
        createEditButton.textContent="Edit";
    }
    else {
        edit_mode = "Create"
        createEditButton.textContent="Create";
    }

    // 2 - Show the dialog to create?edit auesiton
    show( dom_dialog);
}

let edit_mode = "CREATE" // CREATE or EDIT
 

// FUNCTION TO CONCELL ADD AN EDIT==================================

function onCancel(){
    document.querySelector("#title").value='';
    document.querySelector("#choiceA").value = '';
    document.querySelector("#choiceB").value = '';
    document.querySelector("#choiceC").value = '';
    document.querySelector("#choiceD").value = '';
    hide( dom_dialog );
    hide(message_dialog);
    completed(title);
    completed(choiceA);
    completed(choiceB);
    completed(choiceC);
    completed(choiceD);
}

// FUNCTION TO GET ELEMENT TO THE DOM =================================

function onEditQuestion(dom_id){
    id=dom_id;
    console.log(id);
    showEditDialog();
    axios.get("/questions/"+id).then((response)=>{
        let question = response.data;
        document.querySelector("#title").value=question.title;
        document.querySelector("#choiceA").value = question.choiceA;
        document.querySelector("#choiceB").value = question.choiceB;
        document.querySelector("#choiceC").value = question.choiceC;
        document.querySelector("#choiceD").value = question.choiceD;
    })
}

// FUNCTION TO ADD AND EDIT QUESTION=================================

function onCreate(){
    
    // TO CREATE QUESTION ===========================================
    if (id==null){
        let title = document.getElementById('title');
        let choiceA = document.getElementById('choiceA');
        let choiceB = document.getElementById('choiceB');
        let choiceC = document.getElementById('choiceC');
        let choiceD = document.getElementById('choiceD');
        let corect_answer = document.querySelector('.corect');
        if(title.value !== "" && choiceA.value !=="" && choiceB.value !== "" && choiceC.value !== "" && choiceD.value !== ""){
            let new_question = {
                title: title.value,
                choiceA: choiceA.value,
                choiceB: choiceB.value,
                choiceC: choiceC.value,
                choiceD: choiceD.value,
                correct: corect_answer.value
            }
            axios.post( "/questions", new_question);
            refrest_Dom();
            hide(dom_dialog);
            hide(message_dialog)
            completed(title);
            completed(choiceA);
            completed(choiceB);
            completed(choiceC);
            completed(choiceD);
        }else{
            if(title.value == ""){
                error(title);
            }else{
                completed(title);
            }
            if(choiceA.value == ""){

                error(choiceA);
            }else{

                completed(choiceA);
            }
            if(choiceB.value == ""){

                error(choiceB);
            }else{

                completed(choiceB);
            }
            if(choiceC.value == ""){

                error(choiceC);
            }else{

                completed(choiceC);
                
            }
            if(choiceD.value == ""){

                error(choiceD);
            }else{

                completed(choiceD);
            }
            if(title.value == "" || choiceA.value == "" || choiceB.value == "" || choiceC.value == "" || choiceD.value == ""){
                show(message_dialog);
            }
        }
    }
    // TO EDIT QUESTION===================================================
    else{
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
        axios.put("/questions/"+id,new_question);
        hide( dom_dialog);
        refrest_Dom();
    }
}
let id = null;
// Dialog dom======================================================
let dom_dialog = document.getElementById("questions-dialog");
let message_dialog = document.getElementById("message-dialog");
// -----------------------main code ------------------------------
 
refrest_Dom();