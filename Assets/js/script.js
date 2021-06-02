var start = document.getElementById("start");
var startBtn = document.getElementById("startBtn");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var lastQuestGrade = document.getElementById("lastQuestGrade");
var scoreDiv = document.getElementById("scoreContainer");
var quizScore = document.getElementById("quizScore");
var submitBtn = document.querySelector("#submitBtn");
var inputInitials = document.querySelector("#inputInitials")
var msgDiv = document.querySelector("#msg");
var userInitialsSpan = document.querySelector("#userInitials");
var userFinalScoreSpan = 0;
var hsInputForm = document.querySelector("initialSubmit")
var userFinalScore = document.querySelector("#userFinalScore");
var highScores = [];
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoresBtn = document.getElementById("clearHighScoresBtn");

var questions = [
    {
        question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        choiceA: "The User's machine running a Web browser",
        choiceB: "The Web server",
        choiceC: "A central machine deep within Netscape's corporate offices",
        choiceD: "None of the above",
        correct: "A",
    },
    {
        question: "Which of these is not a logical operator?",
        choiceA: "!",
        choiceB: "&",
        choiceC: "&&",
        choiceD: "||",
        correct: "B",
    },
    {
        question: "Which of these operators compares two variables by value AND type?",
        choiceA: "===",
        choiceB: "None of these",
        choiceC: "==",
        choiceD: "=",
        correct: "A",
    },
    {
        question: " The `else` statement is ___",
        choiceA: "Does not exist, in JavaScript `or` and `then` are used to specify code to execute for the “false” case of the `if` statement.",
        choiceB: "Used inside of an `if` statement. To specify the code that should execute if the `if` condition is no longer true.",
        choiceC: "used together with the `if` statement to specify the code that should execute when the `if` condition is false.",
        choiceD: "None of the above",
        correct: "C",
    },
    {
        question: "Which is not a primitive data type in JavaScript?",
        choiceA: "boolean",
        choiceB: "number",
        choiceC: "string",
        choiceD: "character",
        correct: "D",
    },
];

var lastQuestionIndex = questions.length - 1;
var runningQuestionIndex = 0;
var count = 0;
var quizTime = 60;
var gaugeWidth = 150;
var gaugeProgressUnit = gaugeWidth/quizTime;
var TIMER;
var final = 0;
var score = 0;

init();

function renderQuestion(){
    let q = questions[runningQuestionIndex];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = "1. "+ q.choiceA;
    choiceB.innerHTML = "2. "+ q.choiceB;
    choiceC.innerHTML = "3. "+ q.choiceC;
    choiceD.innerHTML = "4. "+ q.choiceD;
}

startBtn.addEventListener("click", startQuiz);
highScoreHeader.addEventListener("click", renderHighScore);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER=setInterval(renderCounter,1000);
}
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
function renderCounter(){
    if(count <= quizTime){
        counter.innerHTML = quizTime - count;
        timeGauge.style.width = gaugeProgressUnit * count + "px";
        count++;
    } else {
            finalScore = 0;
            console.log(finalScore);
            clearInterval(TIMER);
            renderScore();
    }
}
function checkAnswer(answer){
    if(questions[runningQuestionIndex].correct == answer) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    if(runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        renderQuestion();
        } else {
            finalScore = quizTime - count;
            if (finalScore < 0) {finalScore = 0};
            clearInterval(TIMER);
            renderScore();
        }
}
function answerIsCorrect(){
    lastQuestGrade = "Correct!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "green";
}
function answerIsWrong(){
    lastQuestGrade = "Wrong!";
    document.getElementById("lastQuestGrade").innerHTML = lastQuestGrade;
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
    count = count + 10;
}
function renderScore(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    quizScore.innerHTML += "<p>Score = "+ finalScore +"</p>";
}
function storeScores() {
    localStorage.setItem("user", JSON.stringify(highScores));
}
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreContainer.style.display = "none";
    
    var objInitials = document.querySelector("#inputInitials").value.trim();
    
    if(objInitials === "") {
        return;
    }

    console.log("Submit Score: highScores(a) = "+ highScores);
    console.log("Submit Score: objInitials = "+ objInitials);
    console.log("Submit Score: finalScore = "+ finalScore);

    let savedText = (objInitials +" - "+finalScore);
    console.log("Saved Score: savedText = "+ savedText);
    console.log("Saved Score: highScore = "+ highScores);
    highScores.unshift(savedText);

    
    console.log("Submit Score: highScores(b) = "+ highScores);
    storeScores();    
    renderHighScore();
});

goBackBtn.addEventListener("click", goBack);
clearHighScoresBtn.addEventListener("click", clearHighScores);

function renderHighScore(){
    highScoreHeader.style.display = "none";
    start.style.display = "none";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    highScoreList.innerHTML = "";
    if (highScores !== null) {
        for (var i=0; i < highScores.length; i++) {
            var hs = highScores[i];
            var li = document.createElement("li");
            li.textContent = hs;
            li.setAttribute("data-index", i);
            highScoreList.appendChild(li);
        }
    }
}
function init() {
    var storedHighScore = JSON.parse(localStorage.getItem("user"));
    if (storedHighScore != null) {
    highScores = storedHighScore;
    }
 } 
function goBack(){
    console.log(inputInitials.value);
    inputInitials.value = "";
    console.log(inputInitials.value);
    highScoreHeader.style.display = "block";
    start.style.display = "block";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "none";
    lastQuestionIndex = questions.length - 1;
    runningQuestionIndex = 0;
    count = 0;
    quizTime = 60;
    gaugeWidth = 150;
    gaugeProgressUnit = gaugeWidth/quizTime;
    final = 0;
    score = 0;
    quizScore.innerHTML += "";
    console.log(progress.innerHTML);
    progress.innerHTML = "";
    quizScore.innerHTML = "";
    console.log(progress.innerHTML);
}
function clearHighScores(){
    highScoreHeader.style.display = "none";
    start.style.display = "none";
    quiz.style.display = "none";
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    console.log(localStorage.getItem("user"));
    localStorage.clear();
    console.log(localStorage.getItem("user"));
    highScores = [];
    renderHighScore();
}