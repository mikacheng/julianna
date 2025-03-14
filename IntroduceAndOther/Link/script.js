const wordPairs = [
    {english: 'Comment t’appelles-tu?', french: 'What are you called?'},
{english: 'Je m’appelle…', french: 'I am called….'},
{english: 'Mon prénom c’est…', french: 'My first name is …'},
{english: 'Mon nom de famille c’est…', french: 'My surname is …'},
{english: 'Comment ça s’écrit ?', french: 'How do you spell it?'},
{english: 'ça s’écrit…', french: 'It is spelt…'},
{english: 'Quel âge as-tu ?', french: 'How old are you ?'},
{english: 'J’ai quatorze ans.', french: 'i am fourteen years old.'},
{english: 'j’ai Presque quinze ans.', french: 'I am nearly fifteen.'},
{english: 'quelle est la date de ton anniversaire ?', french: 'when is your birthday ?'},
{english: 'Mon anniversaire c’est le six avril.', french: 'My birthday is the sixth of April.'},
{english: 'tu es né (e) quand ?', french: 'Where were you born ?'},
{english: 'Je suis né(e) en deux mille un.', french: 'I was born in 2001.'},
{english: 'ou habites-tu ?', french: 'Where do you live ?'},
{english: 'J’habite à Bordeaux en France.', french: 'I live in Bordeaux in France.'},
{english: 'Je suis Anglais(e)', french: 'i am English'},
{english: 'je suis chinois(e)', french: 'I am Chinese'},
{english: 'je suis Français(e)', french: 'i am French'},
{english: 'Dans ma famille il y a…', french: 'In my family there are …'},
{english: 'personnes', french: 'people'},
{english: 'ma mère', french: 'my mum'},
{english: 'mon père', french: 'my dad'},
{english: 'mes parents', french: 'my parents'},
{english: 'ma sœur', french: 'my sister'},
{english: 'mon frère', french: 'my brother'},
{english: 'mon demi-frère', french: 'my step brother'},
{english: 'ma demi-sœur', french: 'my step sister'},
{english: 'mon beau-père', french: 'my step-dad'},
{english: 'ma belle-mère', french: 'my step mum'},
{english: 'mon grand-père', french: 'my grandad'},
{english: 'ma grand-mère', french: 'my grandmum'},
{english: 'mon oncle', french: 'my uncle'},
{english: 'ma tante', french: 'my aunt'},
{english: 'je suis fille unique', french: 'i am an only child'},
{english: 'je suis fils unique', french: 'I am only child (for boy)'},
{english: 'je n’ai pas de frères ou de sœur', french: 'i don’t have any brothers or sisters'},
{english: 'je suis le cadet / la cadette', french: 'i am the youngest'},
{english: 'je suis l’aine(e)', french: 'i am the eldest'},
{english: 'il s’appelle… elle s’appelle…', french: 'he / she is called…'},
{english: 'il / elle a …. Ans', french: 'he / she is …. Years old'},
{english: 'ils / elles s’appellent ….', french: 'they are called…'},
{english: 'ils / elles ont …. Ans', french: 'they are… years old'},
{english: 'ma sœur s’appelle Maria et elles a douze ans.', french: 'My sister is called Maria and she is twelve years old.'},
{english: 'j’ai deux frères que s’appellent Alex and Mario et ils ont dix ans. Ils sont jumeaux.', french: 'i have two brothers who are called Alex and Mario and they are 10 years old. They are twins.'},

    
];

let correctMatches = 0;

// Shuffle array function
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Select a random subset of 5 word pairs
function selectRandomPairs(pairs, count) {
  return shuffleArray([...pairs]).slice(0, count);
}

// Initialize the game
function initializeGame() {
  const englishColumn = document.getElementById("english-column");
  const frenchColumn = document.getElementById("french-column");
  const result = document.getElementById("result");

  // Clear previous content
  englishColumn.innerHTML = "<h2>English</h2>";
  frenchColumn.innerHTML = "<h2>French</h2>";
  result.textContent = "";
  correctMatches = 0;

  // Select 5 random pairs
  const selectedPairs = selectRandomPairs(wordPairs, 5);

  const shuffledEnglish = shuffleArray([...selectedPairs]);
  const shuffledFrench = shuffleArray([...selectedPairs]);

  // Populate English column
  shuffledEnglish.forEach(pair => {
      const wordBox = document.createElement("div");
      wordBox.textContent = pair.english;
      wordBox.classList.add("word-box");
      wordBox.draggable = true;
      wordBox.dataset.word = pair.english;

      wordBox.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text", event.target.dataset.word);
      });

      englishColumn.appendChild(wordBox);
  });

  // Populate French column
  shuffledFrench.forEach(pair => {
      const wordBox = document.createElement("div");
      wordBox.textContent = pair.french;
      wordBox.classList.add("word-box", "droppable");
      wordBox.dataset.word = pair.english;

      wordBox.addEventListener("dragover", (event) => {
          event.preventDefault();
      });

      wordBox.addEventListener("drop", (event) => {
          event.preventDefault();
          const droppedWord = event.dataTransfer.getData("text");

          if (droppedWord === wordBox.dataset.word) {
              wordBox.classList.add("correct");
              wordBox.classList.remove("droppable");
              wordBox.textContent += ` (${droppedWord})`;

              // Remove the matched English word
              const englishWords = document.querySelectorAll("#english-column .word-box");
              englishWords.forEach(word => {
                  if (word.dataset.word === droppedWord) {
                      word.remove();
                  }
              });

              correctMatches++;
          } else {
              wordBox.classList.add("incorrect");
              setTimeout(() => wordBox.classList.remove("incorrect"), 1000);
          }

          // Check if all matches are correct
          if (correctMatches === selectedPairs.length) {
              result.textContent = "Correct! 🎉 Well done!";
              result.style.color = "green";
          }
      });

      frenchColumn.appendChild(wordBox);
  });
}

// Add reset functionality
document.getElementById("reset-button").addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();
