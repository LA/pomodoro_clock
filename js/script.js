var sessionTime = 30;
var breakTime = 5;
var sessionSeconds = sessionTime * 60;
var breakSeconds = breakTime * 60;
var currentTime = sessionSeconds;
var onBreak = false;
var paused = false;
var started = false;
var timer;
var sessionMinutes;
var breakMinutes;

$(document).ready(function() {
    sessionMinutes = document.getElementById("session-time");
    breakMinutes = document.getElementById("break-time");
});

function timerPressed() {
    if (paused || !started) {
        started = true;
        paused = false;
        var start = Date.now();
        timer = setInterval(function() {
            currentTime -= 1;
            if (currentTime === 0) {
                onBreak = !onBreak;
                if (onBreak) {
                    currentTime = breakSeconds;
                    $("#startButton").css("background-color", "orange");
                    console.log("On Break");
                } else {
                    currentTime = sessionSeconds;
                    $("#startButton").css("background-color", "lightblue");
                    console.log("In Session");
                }
            }
            setDisplayTime();
        }, 1000);
    } else {
        paused = true;
        setDisplayTime();
        clearInterval(timer);
    }
}

function setDisplayTime() {
    var displayTime = (currentTime / 60)
    var seconds = (60 * (displayTime - Math.floor(displayTime)));
    // Account for 00:00 and 05:07 as opposed to 0:0 and 5:7
    var minutes = (Math.floor(displayTime) == 0) ? "00" : Math.floor(displayTime);
    seconds = (seconds == 0) ? "00" : seconds;
    seconds = (seconds.toString().split("").length == 1) ? "0" + seconds : Math.floor(seconds);
    displayTime = minutes + ":" + seconds;
    $("#time").html(displayTime);
}

function togglePressed() {
    paused = true;
    clearInterval(timer);
    $("#startButton").css("background-color", "lightblue");
}

function sessionPlus() {
    togglePressed();
    sessionTime += 1;
    sessionSeconds = sessionTime * 60;
    currentTime = sessionSeconds;
    sessionMinutes.innerHTML = sessionTime;
    setDisplayTime();
}

function sessionMinus() {
    togglePressed();
    sessionTime -= (sessionTime <= 1) ? 0 : 1;
    sessionSeconds = sessionTime * 60;
    currentTime = sessionSeconds;
    sessionMinutes.innerHTML = sessionTime;
    setDisplayTime();
}

function breakPlus() {
    togglePressed();
    breakTime += 1;
    breakSeconds = breakTime * 60;
    currentTime = sessionSeconds;
    setDisplayTime();
    breakMinutes.innerHTML = breakTime;
}

function breakMinus() {
    togglePressed();
    breakTime -= (breakTime <= 1) ? 0 : 1;
    breakSeconds = breakTime * 60;
    currentTime = sessionSeconds;
    setDisplayTime();
    breakMinutes.innerHTML = breakTime;
}
