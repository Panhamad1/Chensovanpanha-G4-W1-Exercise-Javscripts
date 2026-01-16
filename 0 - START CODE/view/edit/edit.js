const STORAGE_KEY = "quizQuestions";

const BASE_QUESTIONS = [
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

// 🔥 THIS IS THE IMPORTANT PART
const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!stored || stored.length === 0) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(BASE_QUESTIONS));
}


// DOM
const questionList = document.querySelector("#questionList");
const modal = document.querySelector("#modal");
const addBtn = document.querySelector("#addBtn");
const saveBtn = document.querySelector("#save");
const cancelBtn = document.querySelector("#cancel");

const titleInput = document.querySelector("#title");
const choiceA = document.querySelector("#choiceA");
const choiceB = document.querySelector("#choiceB");
const choiceC = document.querySelector("#choiceC");
const choiceD = document.querySelector("#choiceD");
const correctInput = document.querySelector("#correct");

let editIndex = null;

// OPEN MODAL (ADD)
addBtn.addEventListener("click", () => {
  editIndex = null;
  clearForm();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

// CANCEL
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// SAVE (ADD OR EDIT)
saveBtn.addEventListener("click", () => {
  const correct = correctInput.value.trim().toUpperCase();

  if (
    !titleInput.value ||
    !choiceA.value ||
    !choiceB.value ||
    !choiceC.value ||
    !choiceD.value ||
    !["A", "B", "C", "D"].includes(correct)
  ) {
    alert("Fill all fields correctly");
    return;
  }

  const questions = getQuestions();

  const questionData = {
    title: titleInput.value,
    choiceA: choiceA.value,
    choiceB: choiceB.value,
    choiceC: choiceC.value,
    choiceD: choiceD.value,
    correct,
  };

  if (editIndex === null) {
    questions.push(questionData);
  } else {
    questions[editIndex] = questionData;
  }

  saveQuestions(questions);
  modal.classList.add("hidden");
  renderList();
});

// LIST RENDER
function renderList() {
  questionList.innerHTML = "";

  getQuestions().forEach((q, index) => {
    const div = document.createElement("div");
    div.className =
      "bg-white p-4 rounded flex justify-between items-center";

    div.innerHTML = `
      <span>${q.title}</span>
      <div class="flex gap-4">
        <img 
          src="../../Image/edit.svg" 
          alt="edit" 
          class="w-5 cursor-pointer"
          onclick="editQuestion(${index})"
        />
        <img 
          src="../../Image/trash.png" 
          alt="delete" 
          class="w-5 cursor-pointer"
          onclick="deleteQuestion(${index})"
        />
      </div>
    `;

    questionList.appendChild(div);
  });
}


// EDIT
window.editQuestion = function (index) {
  const q = getQuestions()[index];
  editIndex = index;

  titleInput.value = q.title;
  choiceA.value = q.choiceA;
  choiceB.value = q.choiceB;
  choiceC.value = q.choiceC;
  choiceD.value = q.choiceD;
  correctInput.value = q.correct;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

// DELETE
window.deleteQuestion = function (index) {
  const questions = getQuestions();
  questions.splice(index, 1);
  saveQuestions(questions);
  renderList();
};

// HELPERS
function getQuestions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveQuestions(qs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(qs));
}

function clearForm() {
  titleInput.value = "";
  choiceA.value = "";
  choiceB.value = "";
  choiceC.value = "";
  choiceD.value = "";
  correctInput.value = "";
}

// INIT
renderList();
