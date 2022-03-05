var container = document.querySelector(".container");

var timerEl = document.getElementById('countdown');

// Timer that counts down from 5
function countdown() {
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
    // Once `timeLeft` gets to 0, set `timerEl` to an empty string
    timerEl.textContent = '';
    // Use `clearInterval()` to stop the timer
    clearInterval(timeInterval);
    // Call the `displayMessage()` function
    displayMessage();
}
}, 1000);
}

countdown();
