import { questions } from "./questions.js";

const questionElement = document.querySelector(".question");
const answerBtns = [...document.querySelectorAll(".answer")];
const nextBtn = document.querySelector(".nextBtn");

let questionIndex = 0;
let score = 0;

showQuestion();

answerBtns.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.dataset.correct == "true") {
      e.classList.add("correct");
      score++;
    } else e.classList.add("wrong");

    answerBtns.forEach((e) => {
      if (e.dataset.correct == "true") e.classList.add("correct");
      e.disabled = true;
    });

    questionIndex++;
    nextBtn.style.display = "block";
  });
});

nextBtn.addEventListener("click", (e) => {
  let questionNumber = questionIndex + 1;
  if (questionNumber <= questions.length) {
    showQuestion();
  } else {
    questionIndex = 0;
    answerBtns[0].parentElement.style.display = "none";
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "play again";
    score = 0;
  }
});

function showQuestion() {
  resetState();

  let questionNumber = questionIndex + 1;
  const currentQuestion = questions[questionIndex];

  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  answerBtns.forEach((e, i) => {
    e.innerHTML = currentQuestion.options[i];
    if (currentQuestion.options[i] === currentQuestion.answer)
      e.dataset.correct = "true";
  });
}

function resetState() {
  answerBtns.forEach((e) => {
    delete e.dataset.correct;
    e.classList.remove("wrong", "correct");
    e.disabled = false;
  });
  nextBtn.style.display = "none";
  answerBtns[0].parentElement.style.display = "block";
  nextBtn.innerHTML = "Next";
}
