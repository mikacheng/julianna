const words = [
  {french: 'amusant', english: 'fun'},
{french: 'intéressant', english: 'interesting'},
{french: 'relaxant', english: 'relaxing'},
{french: 'fantastique', english: 'fantastic'},
{french: 'essentiel', english: 'essential'},
{french: 'bon', english: 'good'},
{french: 'pas mal', english: 'not bad'},
{french: 'génial', english: 'great'},
{french: 'excellent', english: 'excellent'},
{french: 'actif', english: 'active'},
{french: 'délicieux', english: 'delicious'},
{french: 'rapide', english: 'fast, quick'},
{french: 'dangereux', english: 'dangerous'},
{french: 'horrible', english: 'horrible'},
{french: 'difficile', english: 'difficult'},
{french: 'nul', english: 'rubbish'},
{french: 'le', english: 'the (m)'},
{french: 'la', english: 'the (f)'},
{french: 'les', english: 'the (pl)'},
{french: 'aussi', english: 'also, too, as well'},
{french: 'et', english: 'and'},
{french: 'parce que', english: 'because'},
{french: 'car', english: 'because'},
{french: 'cependant', english: 'however'},
{french: 'par contre', english: 'on the other hand'},
{french: 'surtout', english: 'especially, above all'},
{french: 'mais', english: 'but'},
{french: 'beaucoup', english: 'a lot'},
{french: 'assez', english: 'quite, rather'},
{french: 'très', english: 'very'},
{french: 'toi', english: 'you'},
{french: 'je', english: 'I (subject)'},
{french: 'mon, ma, mes', english: 'my'},
{french: 'ne…pas', english: 'not (any)'},
{french: 'ami(s)', english: 'friend(s)'},
{french: 'frère', english: 'brother'},
{french: 'sœur', english: 'sister'},
{french: 'cyclisme', english: 'cycling'},
{french: 'la danse', english: 'dance'},
{french: 'la télé', english: 'TV'},
{french: 'la musique', english: 'music'},
{french: 'le rugby', english: 'rugby'},
{french: 'le sport', english: 'sport'},
{french: 'le rap', english: 'rap'},
{french: 'le foot(ball)', english: 'football'},
{french: 'le chocolat', english: 'chocolate'},
{french: 'les jeux vidéo', english: 'video games'},
{french: 'les films', english: 'films'},
{french: 'les serpents', english: 'snakes'},
{french: 'le gâteau', english: 'cake'},
{french: 'adorer', english: '(to) really like, love, adore'},
{french: 'aimer', english: '(to) like, love'},
{french: 'préférer', english: '(to) prefer'},
{french: 'détester', english: '(to) hate, detest'},
{french: 'être', english: '(to) be'},

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