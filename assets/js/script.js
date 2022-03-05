var container = document.querySelector(".container");

var timerEl = document.getElementById('countdown');

document.getElementById("quizStart").addEventListener("click", function(){
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
});