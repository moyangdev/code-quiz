var container = document.querySelector('.container');
var timerEl = document.getElementById('countdown');
var startEl = document.getElementById('quizStart');
var startScreenEl = document.getElementById("start-screen");
var questionsEl = document.getElementById("questionList");
var currentIndex = 0;

var questions = [
    {
        q: 'Commonly used data types DO Not Include:',
        a: 'alerts',
        choices: ['strings', 'blloeans', 'alerts', 'numbers']
    },
    {
        q: 'The condition in an if/else statement is enclosed with _____.',
        a: 'parenthesis',
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets']
    },
    {
        q: 'Arrays in JavaScript can be used to store _____.',
        a: 'all of the above',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above']
    },
    {
        q: 'String values must be enclosed within _____ when being assigned to variables.',
        a: 'quotes',
        choices: ['commas', 'curly brackets', 'quotes', 'parenthesis']
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        a: 'console.log',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log']
    }
];

function quizTimer(){
    // Timer that counts down from 75
    var timeLeft = 75;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'Time: ' + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
    } else {
        // Once `timeLeft` gets to 0, set `timerEl` to Time is up
        timerEl.textContent = 'Time is up!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
    }
    }, 1000);
    }
    
    function startQuiz(){
        //start timer
        quizTimer();
        startScreenEl.setAttribute("class", "hide");
        getQuestions();
    }

    var getQuestions = function() {
        //get questions from array
        var newQuestion = questions[currentIndex];
        questionsEl.removeAttribute("class");
        //display question
        var questionTitle = document.getElementById("questionHeader");
        questionTitle.textContent = newQuestion.q;
    };

    startEl.onclick = startQuiz;