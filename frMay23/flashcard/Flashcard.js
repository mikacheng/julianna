let term = document.querySelector(".term");
let definition = document.querySelector('.definition');
let checkButton = document.querySelector('.check');
let rightButton = document.querySelector('.right');
let wrongButton = document.querySelector('.wrong');
let languageMode = document.getElementById('languageMode');

let words = {
  open: "ouvert",
  closed: "fermé",
  situated: "situé",
  countrySide: "campagne",
  ancient: "ancienne",
  farm: "ferme",
  traditional: "traditionnelle",
  starter: "entrée",
  "main dish": "plat",
  dessert: "dessert",
  drink: "boisson",
  free: "gratuit",
  fashionable: "a la mode",
  abroad: "à l'étranger",
  "to work": "travailler",
  dish: "repas",
  homeless: "sans-abris",
  charity: "oeuvre caritative",
  lesson: "un cours",
  "to take care of": "s'occuper de",
};

let englishToFrench = [];
let frenchToEnglish = [];
let currentWords = [];
let currentTerm = null;
let currentIndex = 0;

function initializeWordLists() {
  englishToFrench = Object.entries(words).map(([eng, fr]) => ({
    term: eng,
    definition: fr
  }));
  frenchToEnglish = Object.entries(words).map(([eng, fr]) => ({
    term: fr,
    definition: eng
  }));
}

function setCurrentWords() {
  currentWords = languageMode.value === 'englishToFrench' 
    ? [...englishToFrench] 
    : [...frenchToEnglish];
}

function getRandomTerm() {
  if (currentWords.length === 0) {
    term.textContent = "All done! Refresh to restart.";
    definition.textContent = "";
    return;
  }
  currentIndex = Math.floor(Math.random() * currentWords.length);
  currentTerm = currentWords[currentIndex];
  term.textContent = currentTerm.term;
  definition.textContent = currentTerm.definition;
}

// Initial setup
initializeWordLists();
setCurrentWords();
getRandomTerm();

// Event listeners
languageMode.addEventListener('change', () => {
  setCurrentWords();
  getRandomTerm();
  definition.style.display = 'none';
  term.style.display = 'block';
});

checkButton.addEventListener('click', () => {
  definition.style.display = 'block';
  term.style.display = 'none';
});

rightButton.addEventListener('click', () => {
  currentWords.splice(currentIndex, 1);
  getRandomTerm();
  definition.style.display = 'none';
  term.style.display = 'block';
});

wrongButton.addEventListener('click', () => {
  getRandomTerm();
  definition.style.display = 'none';
  term.style.display = 'block';
});