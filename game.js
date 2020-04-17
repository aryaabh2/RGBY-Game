// ----------------------------- Main -----------------------------------------

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScore = 0;

// Wait for keypress to start the game
$("body").on("keypress", function() {
  newGame();
  if (level == 0) {
    nextSequence(buttonColors);
  }
});

// Wait for user clicks and add the userChosenColour to userClieckedPattern
$(".btn").click(function() {

  if (userClickedPattern.length < gamePattern.length) {

    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    if (checkAnswer()) {
      // if success check if we got entire sequence or need more mouse clicks
      if (gamePattern.length == userClickedPattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
          nextSequence(buttonColors);
          updateHighscore()
        }, 1000);
      } else {
        // Continue to listen for key presses
      }
    } else {
      // If failed, game over
      gameOver()
    }
  }

});


// --------------------------- functions --------------------------------------

function nextSequence(colors) {
  level++;
  $("h1").text("level " + level);

  var randomColor = colors[Math.floor(Math.random() * 4)];
  playSound(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100);

  gamePattern.push(randomColor);
}

// if Game Over: FAILED SCREEN and reset all level and arrays
function gameOver() {

  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function newGame() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer() {
  var correct = true;
  var i = 0;
  while ((i < gamePattern.length) && (i < userClickedPattern.length)) {

    if (gamePattern[i] != userClickedPattern[i]) {
      correct = false;
    }
    i++;
  }
  return correct;
}

function updateHighscore() {
  if (level > highScore) {
    highScore = level;
    $(".highScore").text("High Score: " + highScore);
  }
}

// Play sound for both user and random pattern
function playSound(soundName) {
  var address = 'sounds/' + soundName + '.mp3';
  var sound = new Audio(address);
  sound.play();
}

// To animate user button presses
function animatePress(currectColor) {
  $("#" + currectColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currectColor).removeClass("pressed");
  }, 100);
}
