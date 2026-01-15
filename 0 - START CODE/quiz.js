// DOMS ELEMENTS  ---------------------------------------------------------
const dom_quiz = document.querySelector("#quiz");
const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_score = document.querySelector("#score");
const dom_start = document.querySelector("#start");
let dom_choice = document.querySelectorAll(".choice");
dom_start.addEventListener("click", onStart);

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
let allowClick = true;
let q;
// FUNCTIONS ---------------------------------------------------------

// Hide a given element
function hide(element) {
  // TODO
  element.style.display = "none";
}

function show(element) {
  // TODO
  element.style.display = "block";
}

function onStart() {
  // Render the current question
  // Display the quiz view,

    hide(dom_start);
    show(dom_quiz);
    renderQuestion();
}

function renderQuestion() {
  // Render the current question on the quiz view
  q = questions[runningQuestionIndex];
  dom_question.textContent = q.title;
  dom_choiceA.textContent = q.choiceA;
  dom_choiceB.textContent = q.choiceB;
  dom_choiceC.textContent = q.choiceC;
  dom_choiceD.textContent = q.choiceD;
  allowClick = true;
}

function onPlayerSubmit(answer) {
  // Update the score, display the next question or the score view
    if(!allowClick){
      return;
    }
    allowClick = false;
    if(answer == q.correct){
      score++;
    }
    runningQuestionIndex++;
    if(runningQuestionIndex < questions.length){
      renderQuestion();
    } else{
      renderScore();
    }
    
}

function renderScore() {
  // calculate the amount of question percent answered by the user
  // choose the image based on the scorePerCent
  hide(dom_quiz);
  show(dom_score);
  let percentScore = Math.round((score/questions.length) * 100);
  let p = document.createElement("p");
  p.innerText = "Your Score is: "+ percentScore + "%";
  if(percentScore <= 20){
    dom_score.innerHTML = "<img src=" + "../Image/img20.jpg" +">";
  } else if(percentScore <= 40){
    dom_score.innerHTML = "<img src=" + "../Image/img40.jpg" +">";
  } else if(percentScore <= 60){
    dom_score.innerHTML = "<img src=" + "../Image/img60.jpg" +">";
  } else if(percentScore <= 80){
    dom_score.innerHTML = "<img src=" + "../Image/img80.jpg" +">";
  } else{
    dom_score.innerHTML = "<img src=" + "../Image/img100.jpg" +">";
  }
  dom_score.appendChild(p);
  
}
// FUNCTIONS ---------------------------------------------------------
dom_choice.forEach(choice => {
  choice.addEventListener("click", () => {
    onPlayerSubmit(choice.id);
  });
});
show(dom_start);
hide(dom_quiz);
hide(dom_score);

