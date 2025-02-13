let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  let keys = [
    "ouvert",
    "fermé",
    "situé",
    "la_campagne",
    "ancien",
    "la_ferme",
    "traditionnelle",
    "une_entrée",
    "un_plat",
    "le_dessert",
    "la_boissons",
    "gratuit",
    "la_mode",
    "un_sans_abris",
    "une_oeuvre_caritative",
    "un_cours",
    "un_poste",
    "une_poste",
    "s'occuper_de"

    
  ];
  let randomIndex = Math.floor(Math.random() * keys.length);
  let hangmanWord = keys[randomIndex];
  answer = hangmanWord;
}

function generateButtons() {
  let buttonsHTML = "_'-abcdefghijklmnopqrstuvwxyzéèêçà".split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'images/' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " * ")).join('');
  

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
 
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  wordStatus = null;
  document.getElementById('hangmanPic').src = 'images/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  handleGuess("_");
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
handleGuess("_");