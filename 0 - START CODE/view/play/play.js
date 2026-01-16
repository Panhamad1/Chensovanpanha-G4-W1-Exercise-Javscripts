// DOM ELEMENTS ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#score");
const dom_start = document.querySelector("#start");
const dom_choice = document.querySelectorAll(".choice");

// STORAGE ---------------------------------------------------------
const STORAGE_KEY = "quizQuestions";

// LOAD QUESTIONS FROM LOCALSTORAGE 🔥
let questions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// STATE ---------------------------------------------------------
let runningQuestionIndex = 0;
let score = 0;
let allowClick = true;
let q;

// EVENTS ---------------------------------------------------------
dom_start.addEventListener("click", onStart);

dom_choice.forEach(choice => {
  choice.addEventListener("click", () => {
    onPlayerSubmit(choice.id);
  });
});

// FUNCTIONS ---------------------------------------------------------

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

function onStart() {
  if (questions.length === 0) {
    alert("No questions found. Please add questions first.");
    return;
  }

  hide(dom_start);
  show(dom_quiz);
  renderQuestion();
}

function renderQuestion() {
  q = questions[runningQuestionIndex];

  dom_question.textContent = q.title;
  dom_choiceA.textContent = q.choiceA;
  dom_choiceB.textContent = q.choiceB;
  dom_choiceC.textContent = q.choiceC;
  dom_choiceD.textContent = q.choiceD;

  allowClick = true;
}

function onPlayerSubmit(answer) {
  if (!allowClick) return;

  allowClick = false;

  if (answer === q.correct) {
    score++;
  }

  runningQuestionIndex++;

  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    renderScore();
  }
}

function renderScore() {
  hide(dom_quiz);
  show(dom_score);

  let percentScore = Math.round((score / questions.length) * 100);
  let p = document.createElement("p");
  p.innerText = "Your Score is: " + percentScore + "%";

  if (percentScore <= 20) {
    dom_score.innerHTML = `<img src="../../Image/img20.jpg">`;
  } else if (percentScore <= 40) {
    dom_score.innerHTML = `<img src="../../Image/img40.jpg">`;
  } else if (percentScore <= 60) {
    dom_score.innerHTML = `<img src="../../Image/img60.jpg">`;
  } else if (percentScore <= 80) {
    dom_score.innerHTML = `<img src="../../Image/img80.jpg">`;
  } else {
    dom_score.innerHTML = `<img src="../../Image/img100.jpg">`;
  }

  dom_score.appendChild(p);
}

// INIT ---------------------------------------------------------
show(dom_start);
hide(dom_quiz);
hide(dom_score);
