const words = [
  {french: 'What are you called?', english: 'Comment t’appelles-tu?'},
{french: 'I am called….', english: 'Je m’appelle…'},
{french: 'My first name is …', english: 'Mon prénom c’est…'},
{french: 'My surname is …', english: 'Mon nom de famille c’est…'},
{french: 'How do you spell it?', english: 'Comment ça s’écrit ?'},
{french: 'It is spelt…', english: 'ça s’écrit…'},
{french: 'How old are you ?', english: 'Quel âge as-tu ?'},
{french: 'i am fourteen years old.', english: 'J’ai quatorze ans.'},
{french: 'I am nearly fifteen.', english: 'j’ai Presque quinze ans.'},
{french: 'when is your birthday ?', english: 'quelle est la date de ton anniversaire ?'},
{french: 'My birthday is the sixth of April.', english: 'Mon anniversaire c’est le six avril.'},
{french: 'Where were you born ?', english: 'tu es né (e) quand ?'},
{french: 'I was born in 2001.', english: 'Je suis né(e) en deux mille un.'},
{french: 'Where do you live ?', english: 'ou habites-tu ?'},
{french: 'I live in Bordeaux in France.', english: 'J’habite à Bordeaux en France.'},
{french: 'i am English', english: 'Je suis Anglais(e)'},
{french: 'I am Chinese', english: 'je suis chinois(e)'},
{french: 'i am French', english: 'je suis Français(e)'},
{french: 'In my family there are …', english: 'Dans ma famille il y a…'},
{french: 'people', english: 'personnes'},
{french: 'my mum', english: 'ma mère'},
{french: 'my dad', english: 'mon père'},
{french: 'my parents', english: 'mes parents'},
{french: 'my sister', english: 'ma sœur'},
{french: 'my brother', english: 'mon frère'},
{french: 'my step brother', english: 'mon demi-frère'},
{french: 'my step sister', english: 'ma demi-sœur'},
{french: 'my step-dad', english: 'mon beau-père'},
{french: 'my step mum', english: 'ma belle-mère'},
{french: 'my grandad', english: 'mon grand-père'},
{french: 'my grandmum', english: 'ma grand-mère'},
{french: 'my uncle', english: 'mon oncle'},
{french: 'my aunt', english: 'ma tante'},
{french: 'i am an only child', english: 'je suis fille unique'},
{french: 'I am only child (for boy)', english: 'je suis fils unique'},
{french: 'i don’t have any brothers or sisters', english: 'je n’ai pas de frères ou de sœur'},
{french: 'i am the youngest', english: 'je suis le cadet / la cadette'},
{french: 'i am the eldest', english: 'je suis l’aine(e)'},
{french: 'he / she is called…', english: 'il s’appelle… elle s’appelle…'},
{french: 'he / she is …. Years old', english: 'il / elle a …. Ans'},
{french: 'they are called…', english: 'ils / elles s’appellent ….'},
{french: 'they are… years old', english: 'ils / elles ont …. Ans'},
{french: 'My sister is called Maria and she is twelve years old.', english: 'ma sœur s’appelle Maria et elles a douze ans.'},
{french: 'i have two brothers who are called Alex and Mario and they are 10 years old. They are twins.', english: 'j’ai deux frères que s’appellent Alex and Mario et ils ont dix ans. Ils sont jumeaux.'},


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