// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.querySelector("#start");
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");

const dom_score = document.querySelector("#score");

// DATA  ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let runningQuestionIndex = 0;
let score = 0;

// FUNCTIONS ---------------------------------------------------------

// Save questions to local storage
function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

// Load questions from local storage
function loadQuestions() {
  let storedQuestion = JSON.parse(localStorage.getItem("questions"));
  if (storedQuestion !== null) {
    questions = storedQuestion;
  }
}

// Hide a given element
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

// render a question
function renderQuestion() {
  let question = questions[runningQuestionIndex];

  dom_question.textContent = question.title;
  dom_choiceA.textContent = question.choiceA;
  dom_choiceB.textContent = question.choiceB;
  dom_choiceC.textContent = question.choiceC;
  dom_choiceD.textContent = question.choiceD;
}

// Start quiz
dom_start.addEventListener("click", (e) => {
  hide(dom_start);
  show(dom_quiz);

  // 2- Reset the question index to 0
  currentQuestionIndex = 0;

  // 2 - Render the first question
  renderQuestion();
});

// checkAnwer
function checkAnswer(answer) {
  if (answer == questions[runningQuestionIndex].correct) {
    score++; // Increase the score
  }

  if (runningQuestionIndex < questions.length - 1) {
    runningQuestionIndex++;
    renderQuestion(); // Show the next question
  } else {
    renderSCore(); // end the quiz and show the score
  }
}

// score render
function renderSCore() {
  hide(dom_quiz);
  show(dom_score);

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  comment = "AMAZING !";
  image = "img/100.png";

  if (scorePerCent <= 20) {
    comment = "HUMM !";
    image = "img/20.png";
  } else if (scorePerCent <= 40) {
    comment = "YOU CAN IMPROVE !";
    image = "img/40.png";
  } else if (scorePerCent <= 60) {
    comment = "NOT BAD !";
    image = "img/60.png";
  } else if (scorePerCent <= 80) {
    comment = "GOOD !";
    image = "img/80.png";
  }
  dom_score.innerHTML = "<img src=" + image + ">";
  dom_score.innerHTML += "<p>" + comment + " : " + scorePerCent + " %</p>";
}

/*
TODO : test the local storage
 1 - Launch saveQuestions() when the view PLAY is displayed
 2 - heck the questions are saved on the local storage
 3 - Replace saveQuestions()  by loadQuestions() when starting to play quiz
 4 - Change 1 question on the local storage
 5 - Reload the page : check  we load question from the local storage  

*/
loadQuestions();
