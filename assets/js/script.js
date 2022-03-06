var container = document.querySelector('.container');
var timerEl = document.getElementById('countdown');
var startEl = document.getElementById('quizStart');
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questionList");
var questionIndex = 0;
var choices = document.getElementById("choices");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var timeLeft;
var score = 0;
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var quizDone;


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
    if (quizDone) {
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
        quizDone = "true";
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

//create high score values
var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your initials!");
        return;
    }
}

startEl.onclick = startQuiz;
formInitials.addEventListener("submit", createHighScore)