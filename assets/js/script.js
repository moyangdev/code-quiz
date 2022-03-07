//starting/ending
var container = document.querySelector('.container');
var timerEl = document.getElementById('countdown');
var startEl = document.getElementById('quizStart');
var startScreenEl = document.getElementById("start-screen");
var timeLeft;
var endQuiz;

//question related
var questionsEl = document.getElementById("questionList");
var questionIndex = 0;
var choices = document.getElementById("choices");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var score = 0;
var containerScoreEl = document.getElementById("score-banner");

//high score related
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-scores");

// create array to hold scores for saving
var scores = [];

//list of questions
var questions = [
    {
        q: 'Commonly used data types DO Not Include:',
        a: 'alerts',
        c: ['strings', 'booleans', 'alerts', 'numbers']
    },
    {
        q: 'The condition in an if/else statement is enclosed with _____.',
        a: 'parenthesis',
        c: ['quotes', 'curly brackets', 'parenthesis', 'square brackets']
    },
    {
        q: 'Arrays in JavaScript can be used to store _____.',
        a: 'all of the above',
        c: ['numbers and strings', 'other arrays', 'booleans', 'all of the above']
    },
    {
        q: 'String values must be enclosed within _____ when being assigned to variables.',
        a: 'quotes',
        c: ['commas', 'curly brackets', 'quotes', 'parenthesis']
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        a: 'console.log',
        c: ['JavaScript', 'terminal/bash', 'for loops', 'console.log']
    }
];

function quizTimer(){
    // Timer that counts down from 75
    timeLeft = 75;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'Time: ' + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
    if (endQuiz) {
            clearInterval(timeInterval);
    }
    } else {
        // Once `timeLeft` gets to 0, set `timerEl` to Time is up
        timerEl.textContent = 'Time is up!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        showScore();
    }
    }, 1000);
}

function startQuiz(){
        //start timer
        quizTimer();
        startScreenEl.setAttribute("class", "hide");
        getQuestions();
        btnGoBackEl.classList.add("hide");
        btnClearScoresEl.classList.add("hide");
}

function getQuestions() {
        //get questions from array
        var newQuestion = questions[questionIndex];
        questionsEl.removeAttribute("class");

        //display question
        var questionTitle = document.getElementById("questionHeader");
        questionTitle.textContent = newQuestion.q;
        
        //clear previous choices
        choices.innerHTML = "";
    
        //display choices and buttons
        newQuestion.c.forEach(function(choice, i) {
        var choiceBtns = document.createElement("button");
        choiceBtns.setAttribute("class", "btn");
        choiceBtns.setAttribute("value", choice);
        choiceBtns.textContent = choice;
        choices.appendChild(choiceBtns);
        //run checkAnswer function when choice button is clicked
        choiceBtns.addEventListener("click", checkAnswer);
        });
}

//check if answer is correct    
var checkAnswer = function(event) {
    var selectedanswer = event.target
        if (questions[questionIndex].a === selectedanswer.innerText){
            answerCorrect();
            score = score + 20;
        }
        else {
            answerWrong();
            timeLeft = timeLeft - 10;
        };

    questionIndex++;
        if (questionIndex === questions.length) {
        endQuiz = "true";
        showScore();
        } 
        else {
        getQuestions();
    }    
}

//display correct answer
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
        }
    }  
//display wrong answer 
var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}

//display score screen
var showScore = function () {
    containerScoreEl.removeAttribute("class");
    questionsEl.classList.add("hide");
    formInitials.removeAttribute("class");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + ".");
    containerScoreEl.appendChild(scoreDisplay);
}       

//create high score
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your initials!");
        return;
    }

    var scoreObj = {
        initials: initials,
        score: score
        };
    
    scores.push(scoreObj);
    
    for (var i = 0; i < scores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score"
        highscoreEl.innerHTML = scores[i].initials + " - " + scores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
        }

    saveHighScore();

    containerScoreEl.classList.add("hide");
    formInitials.classList.add("hide");

    displayHighScores();
}

//save high score to local storage 
var saveHighScore = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
    };


var retrieveScores = function() {
var savedScores = localStorage.getItem("scores");    
// if there are no tasks, set scores to an empty array and return out of the function
if (!savedScores) {
    return false;
}
console.log("Saved scores found!");

// parse into array of objects
savedScores = JSON.parse(savedScores);

// loop through savedScores array
for (var i = 0; i < savedScores.length; i++) {
    // pass each task object into the `createTaskEl()` function
    
    //create score in a list format 
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerText = savedScores[i].initials + " - " + savedScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    scores.push(savedScores[i]);
}
};

//display scores while hiding other elements
var displayHighScores = function() { 
    startScreenEl.classList.add("hide");
    questionsEl.classList.add("hide");
    btnGoBackEl.removeAttribute("class");
    btnClearScoresEl.removeAttribute("class");
    containerHighScoresEl.removeAttribute("class");
    //endQuiz = "true";
}

//clears scores
var clearScores = function () {
scores = [];

while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
}

//clears local storage
localStorage.clear(scores);
} 

//reset main screen when go back button is clicked
function resetScreen(){ 
    containerScoreEl.classList.add("hide");
    containerHighScoresEl.classList.add("hide");
    formInitials.classList.add("hide");
    questionIndex = 0;
    getQuestions();
}

//on click, start quiz
startEl.onclick = startQuiz;
//on submit, save score
formInitials.addEventListener("submit", createHighScore);
//when view high scores is clicked
viewHighScoreEl.addEventListener("click", displayHighScores);
//when go back button is clicked
btnGoBackEl.addEventListener("click", resetScreen);
//when clear high scores button is clicked
btnClearScoresEl.addEventListener("click", clearScores);

//load scores from local memory
retrieveScores();