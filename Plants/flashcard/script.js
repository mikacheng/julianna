const words = [
  {french: 'Arbre', english: 'Tree'},
  {french: 'Cactus', english: 'Cactus'},
  {french: 'Champignon', english: 'Mushroom'},
  {french: 'Pissenlit', english: 'Dandelion'},
  {french: 'Fleur', english: 'Flower'},
  {french: 'Rose', english: 'Rose'},
  {french: 'Lavande', english: 'Lavender'},
  {french: 'Tulipe', english: 'Tulip'},
  {french: 'Tournesol', english: 'Sunflower'},
  {french: 'Feuille', english: 'Leaf'},
  {french: 'Herbe', english: 'Grass'}
];

let currentWords = [...words];
let currentCard = null;
let startWithFrench = true;

const languageSelection = document.getElementById('language-selection');
const container = document.querySelector('.container');
const flashcard = document.getElementById('flashcard');
const frontText = document.getElementById('front-text');
const backText = document.getElementById('back-text');
const checkBtn = document.getElementById('check-btn');
const resultButtons = document.getElementById('result-buttons');
const correctBtn = document.getElementById('correct');
const wrongBtn = document.getElementById('wrong');
const startBtn = document.getElementById('start-btn');
const languageSelect = document.getElementById('language-select');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initGame() {
  shuffleArray(currentWords);
  showNextCard();
}

function showNextCard() {
  if (currentWords.length === 0) {
    flashcard.innerHTML = '<div class="completion-message"><h2>Congratulations!</h2><p>All cards completed!</p></div>';
    resultButtons.classList.add('hidden');
    return;
  }

  const cardInner = document.querySelector('.card-inner');
  cardInner.style.transition = 'none';
  flashcard.classList.remove('flipped');
  void cardInner.offsetHeight; // Trigger reflow
  cardInner.style.transition = '';

  currentCard = currentWords[0];
  if (startWithFrench) {
    frontText.textContent = currentCard.french;
    backText.textContent = currentCard.english;
  } else {
    frontText.textContent = currentCard.english;
    backText.textContent = currentCard.french;
  }

  checkBtn.classList.remove('hidden');
  resultButtons.classList.add('hidden');
}

startBtn.addEventListener('click', () => {
  startWithFrench = languageSelect.value === 'french';
  languageSelection.classList.add('hidden');
  container.classList.remove('hidden');
  initGame();
});

checkBtn.addEventListener('click', () => {
  flashcard.classList.add('flipped');
  checkBtn.classList.add('hidden');
  resultButtons.classList.remove('hidden');
});

correctBtn.addEventListener('click', () => {
  currentWords = currentWords.filter(word => word !== currentCard);
  showNextCard();
});

wrongBtn.addEventListener('click', () => {
  currentWords.push(currentWords.shift());
  shuffleArray(currentWords);
  showNextCard();
});

[checkBtn, correctBtn, wrongBtn].forEach(btn => {
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    btn.click();
  });
});