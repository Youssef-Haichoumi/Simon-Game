var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var randomChosenColour;

var counter = 0;

var gameStart = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("level " + level);
  randomChosenColour = buttonColours[randomNumber];
  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  audio.play();
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).animate(
    {
      opacity: 0,
    },
    50
  );
  $("#" + randomChosenColour).animate(
    {
      opacity: 1,
    },
    50
  );
}

$(".btn").click(function (event) {
  var userChosenColour = event.currentTarget.id;
  var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
  audio.play();
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
$(document).keypress(function () {
  if (!gameStart) {
    console.log("pressed");
    nextSequence();
    gameStart = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
}
