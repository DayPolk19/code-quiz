// reference the button
const button1 = $("#button1");
const button2 = $("#button2");
const button3 = $("#button3");
const button4 = $("#button4");
const question = $("#question");
const timer = $("#timer");
const quizPage = $("#quiz-page");
const resultsPage = $("#results-page");
const scoreSpan = $("#score");
const submitButton = $("#submit-button");
const initialsInput = $("#initials-input");
const highScorePage = $("#highscore-page");
const listOfHighScores = $("#highscores");
var score = document.getElementById("score");
resultsPage.hide();
highScorePage.hide();

let timerCount = 75;

let intervalID = setInterval(function () {
  timer.text(timerCount); // display the timer count onto the page

  timerCount = timerCount - 1; // subtract 1 for next time

  if (timerCount < 0) {
    timerCount = 0;
  }
}, 1000);

let questions = [
  {
    text: "How many legs do spiders have?!",
    choices: ["2", "4", "6", "8"],
    answer: "8",
  },
  {
    text: "What does CSS stand for?",
    choices: [
      "Cats Sound Smooth",
      "Call Sam Smiley",
      "Cascading Style Sheets",
      "Camels Seem Smooth",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    text: "What does HTML stand for?",
    choices: ["Hello to my love", "HyperText Markup Language"],
    answer: "three",
  },
  {
    text: "Choose the correct HTML element for the largest heading:",
    choices: ["<head>", "<h1>", "<h6>", "<heading>"],
    answer: "<h1>",
  },
  {
    text: "HTML comments start with",
    choices: ["//", "<!--", "/*"],
    answer: "<!-->",
  },
];

let numberCorrect = 0;
let questionIndex = 1;

function handleButtonClick(event) {
  console.log(event.target.innerText);

  // check if the selected choice is the answer
  if (event.target.innerText === questions[questionIndex - 1].answer) {
    console.log("your are right!");
    numberCorrect = numberCorrect + 1;
    console.log(numberCorrect);
  } else {
    console.log("you are incorrect");
    numberCorrect = numberCorrect - 1;
    timerCount = timerCount - 10;
    timer.text(timerCount); // update display with new timer count
  }

  // check if we're on the last question...

  // if we are on the last question...
  if (questionIndex == questions.length) {
    clearInterval(intervalID);
    quizPage.hide();
    resultsPage.show();
    scoreSpan.text(timerCount);
  } else {
    // change question text to next question
    question.text(questions[questionIndex].text);

    // change the answer choices
    button1.text(questions[questionIndex].choices[0]);
    button2.text(questions[questionIndex].choices[1]);
    button3.text(questions[questionIndex].choices[2]);
    button4.text(questions[questionIndex].choices[3]);

    questionIndex = questionIndex + 1;
  }
}

function handleSubmitButtonClick(event) {
  console.log("submit button clicked");
  event.preventDefault();

  resultsPage.hide();
  highScorePage.show();

  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var finalScore = {
    name: initialsInput.val(),
    score: score.textContent,
  };

  console.log("initials: and score: ", finalScore);
  scoresArray.push(finalScore);

  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);
  // show current highscores
  showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {
  var savedHighScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  // display name and score on high score page
  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].name + ": " + storedHighScores[i].score;
    listOfHighScores.append(eachNewHighScore);
  }
}

submitButton.on("click", handleSubmitButtonClick);

// mess with it -
// make the button print "clicked" when clicked
button1.on("click", handleButtonClick);
button2.on("click", handleButtonClick);
button3.on("click", handleButtonClick);
button4.on("click", handleButtonClick);

// Make questions switch after button is clicked
// Console log if the choice was correct or incorrect
// Add a timer with text counting down
// Subtract 5 seconds when user is incorrect
