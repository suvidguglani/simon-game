let boxes = ["topLeft", "topRight", "bottomRight", "bottomLeft"];
let gamePattern = [], userSelectedPattern = [], started = false, level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level").text("Level " + level);
        pattern();
        started = true;
    }
});

$(".box").click(function () {
    let userSelectedBox = $(this).attr("id");
    userSelectedPattern.push(userSelectedBox);

    boxPressAnimation(userSelectedBox);
    answerCheck(userSelectedPattern.length - 1);
});

function answerCheck(currentLevel) {
    if (gamePattern[currentLevel] === userSelectedPattern[currentLevel]) {
        if (gamePattern.length === userSelectedPattern.length) {
            setTimeout(function () {
                pattern();
            }, 1000);
        }
    } else {
        wrongSound();

        $("body").addClass("gameOver");
        $("#level").text("Game Over🙁 Press any key to restart the game!");
        setTimeout(function () {
            $("body").removeClass("gameOver");
        }, 400);

        startAgain();
    }
}

function pattern() {
    userSelectedPattern = [];
    level++;

    $("#level").text("Level " + level);
    let selectedBox = Math.floor(Math.random() * 4);
    let randomChosenColor = boxes[selectedBox];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function boxPressAnimation(currentBox) {
    $("#" + currentBox).addClass("pressed");
    setTimeout(function () {
        $("#" + currentBox).removeClass("pressed");
    }, 100);
}

function wrongSound() {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
}

function startAgain() {
    level = 0;
    started = false;
    gamePattern = [];
}
