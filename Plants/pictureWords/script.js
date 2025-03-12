const quizData = [
   
];

const clothingImage = document.getElementById('clothing-image');
const optionButtons = document.querySelectorAll('.option-button');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');

let currentQuestion = {};
let selectedAnswer = null;

// Shuffle the options for randomness
function shuffleOptions(options) {
  return options.sort(() => Math.random() - 0.5);
}

// Load a new question
function loadQuestion() {
  const randomIndex = Math.floor(Math.random() * quizData.length);
  currentQuestion = quizData[randomIndex];
  selectedAnswer = null;

  clothingImage.src = currentQuestion.image;
  clothingImage.alt = currentQuestion.correct;

  const shuffledOptions = shuffleOptions(currentQuestion.options);
  optionButtons.forEach((button, index) => {
      button.textContent = shuffledOptions[index];
      button.dataset.choice = shuffledOptions[index];
      button.classList.remove('selected');
  });

  result.textContent = '';
}

// Handle option selection
optionButtons.forEach(button => {
  button.addEventListener('click', () => {
      selectedAnswer = button.dataset.choice;
      optionButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
  });
});

// Handle answer submission
submitButton.addEventListener('click', () => {
  if (!selectedAnswer) {
      result.textContent = 'Please select an answer.';
      result.style.color = 'red';
      return;
  }

  if (selectedAnswer === currentQuestion.correct) {
      result.textContent = 'Correct! 🎉 Bien fait!';
      result.style.color = 'green';
  } else {
      result.textContent = `Incorrect! 😔 The correct answer is "${currentQuestion.correct}".`;
      result.style.color = 'red';
  }

  setTimeout(loadQuestion, 2000); // Load a new question after 3 seconds
});

// Handle option selection
optionButtons.forEach(button => {
  button.addEventListener('click', () => {
      selectedAnswer = button.dataset.choice;
      // Remove 'selected' class from all buttons
      optionButtons.forEach(btn => btn.classList.remove('selected'));
      // Add 'selected' class to the clicked button
      button.classList.add('selected');
  });
});


// Initialize the game
loadQuestion();
