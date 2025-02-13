let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  const keys = [
    "ouvert",
    "fermé",
    "situé",
    "la campagne",
    "ancien",
    "la ferme",
    "traditionnelle",
    "une entrée",
    "un plat",
    "le dessert",
    "les boissons",
    "gratuit",
    "la mode",
    "un sans abri",
    "une œuvre caritative",
    "un cours",
    "un poste",
    "une poste",
    "s'occuper de"
  ];
  answer = keys[Math.floor(Math.random() * keys.length)].toLowerCase();
}

function generateButtons() {
  const accentedLetters = ['é', 'è', 'ê', 'ç', 'à', 'ù', 'î', 'ô', 'û', 'â', 'œ'];
  const buttonsHTML = accentedLetters.map(letter => `
    <button class="btn btn-primary keyboard-btn m-1" 
            id="${letter}" 
            onclick="handleGuess('${letter}')">
      ${letter}
    </button>
  `).join('');
  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  chosenLetter = chosenLetter.toLowerCase();
  if (guessed.includes(chosenLetter)) return;

  guessed.push(chosenLetter);
  document.getElementById(chosenLetter)?.setAttribute('disabled', true);

  if (!answer.includes(chosenLetter)) {
    mistakes++;
    updateMistakes();
    updateHangmanPicture();
  }
  guessedWord();
  checkGameOver();
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => {
    if (letter === ' ') return '   '; // Add extra spacing for blanks
    if (letter === "'") return "'"; // Keep apostrophes as is
    return guessed.includes(letter) ? letter : "_"; // Replace * with _
  }).join('');

  document.getElementById('wordSpotlight').textContent = wordStatus;
}

function checkGameOver() {
  if (!wordStatus.includes('_')) {
    document.getElementById('keyboard').innerHTML = '<div class="alert alert-success">You Won!</div>';
  } else if (mistakes >= maxWrong) {
    document.getElementById('wordSpotlight').textContent = answer;
    document.getElementById('keyboard').innerHTML = '<div class="alert alert-danger">Game Over!</div>';
  }
}

// Add keyboard input for regular letters
document.addEventListener('keydown', (e) => {
  if (/^[a-z]$/i.test(e.key)) {
    handleGuess(e.key.toLowerCase());
  }
});

// Existing helper functions remain similar, just update their DOM references
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = `images/${mistakes}.png`;
}

function updateMistakes() {
  document.getElementById('mistakes').textContent = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'images/0.png';
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

// Initialize game
randomWord();
generateButtons();
guessedWord();