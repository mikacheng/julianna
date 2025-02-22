let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let currentCategory = 'food'; // Default category

const wordsByCategory = {
  food: [
    "le poulet", "le boeuf", "le poisson", "le hamburger", "la carotte", 
    "la pomme de terre", "les petits pois", "la tomate", "l’orange", 
    "la pomme", "la banane", "la fraise", "le fromage", "l’oeuf", 
    "le lait", "la glace", "le bonbon"
  ],
  clothes: [
    "la chaussette", "la chaussure", "la chemise", "la jupe", 
    "le pantalon", "le pull", "la robe", "le short", "le tshirt"
  ],
  animals: [
    "le chien", "le chat", "le lion", "l’éléphant", "le singe", 
    "la girafe", "le tigre", "le zèbre", "le kangourou"
  ],
  countries: [
    "la france", "l’allemagne", "l’espagne", "l’italie", "le canada", 
    "le japon", "la chine", "l’australie", "le brésil"
  ]
  // Add more categories as needed
};

// Function to select a category
function selectCategory(category) {
  currentCategory = category;
  reset(); // Reset the game with the new category
}

// Function to select a random word from the chosen category
function randomWord() {
  const keys = wordsByCategory[currentCategory];
  answer = keys[Math.floor(Math.random() * keys.length)].toLowerCase();
}

// Function to generate the keyboard buttons
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

// Function to handle a guessed letter
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

// Function to update the displayed word with guessed letters
function guessedWord() {
  wordStatus = answer.split('').map(letter => {
    if (letter === ' ') return '   '; // Add extra spacing for blanks
    if (letter === "'") return "'"; // Keep apostrophes as is
    return guessed.includes(letter) ? letter : "_"; // Replace * with _
  }).join('');

  document.getElementById('wordSpotlight').textContent = wordStatus;
}

// Function to check if the game is over
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

// Focus the hidden input when the game area is clicked
document.addEventListener('click', () => {
  document.getElementById('mobileInput').focus();
});

// Capture input from the hidden input field
document.getElementById('mobileInput').addEventListener('input', (e) => {
  const input = e.target.value.toLowerCase();
  if (/^[a-z]$/.test(input)) {
    handleGuess(input);
  }
  e.target.value = ''; // Clear the input after processing
});

// Prevent the hidden input from showing suggestions or autocorrect
document.getElementById('mobileInput').setAttribute('autocomplete', 'off');
document.getElementById('mobileInput').setAttribute('autocorrect', 'off');
document.getElementById('mobileInput').setAttribute('spellcheck', 'false');

// Function to update the hangman picture
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = `images/${mistakes}.png`;
}

// Function to update the mistakes counter
function updateMistakes() {
  document.getElementById('mistakes').textContent = mistakes;
}

// Function to reset the game
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