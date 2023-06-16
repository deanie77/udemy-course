var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function () {
    $("h1").text("Level " + level);
    nextSequence();
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour); 
    playSound(userChosenColour); 
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    $("h1").text("Level " + level++);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatedPress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

