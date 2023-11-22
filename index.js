const textList = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            },
            {
                text: "Blue Whale", correct: true
            },
            {
                text: "Elephant", correct: false
            },
            {
                text: "Giraffe", correct: false
            }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {
                text: "Australia", correct: true
            },
            {
                text: "Asia", correct: false
            },
            {
                text: "Africa", correct: false
            },
            {
                text: "Europe", correct: false
            }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {
                text: "Vantican City", correct: true
            },
            {
                text: "Bhutan", correct: false
            },
            {
                text: "Nepal", correct: false
            },
            {
                text: "Sri Lanka", correct: false
            }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {
                text: "kalahari", correct: false
            },
            {
                text: "Gobi", correct: false
            },
            {
                text: "Sahara", correct: false
            },
            {
                text: "Antartica", correct: true
            }
        ]
    }
]

const questionElement = document.querySelector("#question");
const AnswersBox = document.querySelector(".options")
const NextBtn = document.querySelector(".next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = textList[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const li = document.createElement("LI");
        li.innerHTML = answer.text;
        AnswersBox.appendChild(li);
        if(answer.correct){
            li.dataset.correct = answer.correct
        }
        li.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    NextBtn.style.display = "none";
    while(AnswersBox.firstChild){
        AnswersBox.removeChild(AnswersBox.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(AnswersBox.children).forEach(li => {
        if(li.dataset.correct === "true"){
            li.classList.add("correct");
        }
        li.disabled = true;
    });
    NextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${textList.length}`;
    NextBtn.innerHTML = "Play Again";
    NextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < textList.length){
        showQuestion();
    }else{
        showScore();
    }
}

NextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < textList.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();