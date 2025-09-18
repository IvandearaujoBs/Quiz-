// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Qual cantora é conhecida como Rainha do Pop?"

,
    answers: [
      { text: "Rihanna", correct: false },
      { text: "Billie Eilish", correct: false },
      { text: "Madonna", correct: true },
      { text: "Britney Spears", correct: false },
    ],
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Quem foi o primeiro presidente do Brasil??",
    answers: [
      { text: "Getúlio Vargas", correct: false },
      { text: "Dom Pedro II", correct: false },
      { text: "Juscelino Kubitschek", correct: false },
      { text: "Marechal Deodoro da Fonseca ", correct: true },
    ],
  },
  {
    question: "Qual é o maior órgão do corpo humano?",
    answers: [
      { text: "Pele", correct: true  },
      { text: "Intestino", correct: false },
      { text: "Cérebro", correct:false },
      { text: "Fígado", correct: false },
    ],
  },
  {
    question: "Qual é o símbolo químico do ouro?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
    ],
  },
  {
question: "Qual foi o primeiro filme a ganhar o Oscar de Melhor Filme de Animação?",
    answers: [
      { text: " Procurando Nemo", correct: false },
      { text: "Shrek", correct: true },
      { text: "Toy Story", correct:false },
      { text: "A Viagem de Chihiro", correct: false },
    ],
  },
  {
    question: "Quem foi a primeira mulher a ganhar um Prémio Nobel?",
    answers: [
      { text: "Ada Lovelace", correct: false },
      { text: "Rosalind Franklin", correct: false },
      { text: "Marie Curie", correct: true },
      { text: "Dorothy Hodgkin", correct: false },
    ],
  },
  {
    question: "Qual é o elemento químico mais leve?",
    answers: [
      { text: "Hidrogénio", correct: true },
      { text: "Carbono", correct: false },
      { text: "Oxigénio", correct: false },
      { text: "Hélio", correct: false },
    ],
  },
  {
    question: "Qual é a língua nativa mais falada no mundo?",
    answers: [
      { text: "Inglês", correct: false },
      { text: "Espanhol", correct: false },
      { text: "Mandarim", correct: true },
      { text: "Hindi", correct: false },
    ],
  },
  {
    question: "Qual oceano é o maior e mais profundo da Terra?",
    answers: [
      { text: "Oceano Pacífico", correct: true },
      { text: "Oceano Ártico", correct: false },
      { text: "Oceano Índicoq03", correct: false },
      { text: "Oceano Atlântico", correct: false },
    ],
  },
];

//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}
function showQuestion() {
    //reset satate
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    //todo:
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        //dataset
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    }); 
}

function selectAnswer(event) {
    //optimization check
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    //todo: explain
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }     

    setTimeout(() => {
        currentQuestionIndex++;

       //check if there are more questions or in the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
         showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Resultado Perfeito! Você é um gênio!";
      confetti({
        particleCount: 150,
        spread: 70, 
        origin: { y: 0.6 }
      });
          
    } else if (percentage >= 80) {
        resultMessage.textContent = "Muito bem! você sabe de mais!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Nada mal, percisa estudar mais!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Uau. Essa pontuação não foi apenas ruim, foi um pedido de socorro. A Wikipédia está esperando por você.";
  } else if (percentage >= 30) {
        resultMessage.textContent = "Parabéns, você conseguiu errar quase tudo. É um feito notável, mas não do jeito que você gostaria.";
}  else if (percentage >= 10) {
        resultMessage.textContent = "Você não errou as perguntas, você declarou guerra ao conhecimento. O conhecimento venceu. Tente uma trégua e estude";
}  else if (percentage >= 1) {
        resultMessage.textContent = "Sua pontuação foi tão baixa que até a calculadora sentiu pena. Volte a estudar, é um conselho";
}

}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}