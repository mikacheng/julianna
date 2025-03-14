const wordPairs = [
    {english: 'fun', french: 'amusant'},
    {english: 'interesting', french: 'intéressant'},
    {english: 'relaxing', french: 'relaxant'},
    {english: 'fantastic', french: 'fantastique'},
    {english: 'essential', french: 'essentiel'},
    {english: 'good', french: 'bon'},
    {english: 'not bad', french: 'pas mal'},
    {english: 'great', french: 'génial'},
    {english: 'excellent', french: 'excellent'},
    {english: 'active', french: 'actif'},
    {english: 'delicious', french: 'délicieux'},
    {english: 'fast, quick', french: 'rapide'},
    {english: 'dangerous', french: 'dangereux'},
    {english: 'horrible', french: 'horrible'},
    {english: 'difficult', french: 'difficile'},
    {english: 'rubbish', french: 'nul'},
    {english: 'the (m)', french: 'le'},
    {english: 'the (f)', french: 'la'},
    {english: 'the (pl)', french: 'les'},
    {english: 'also, too, as well', french: 'aussi'},
    {english: 'and', french: 'et'},
    {english: 'because', french: 'parce que'},
    {english: 'because', french: 'car'},
    {english: 'however', french: 'cependant'},
    {english: 'on the other hand', french: 'par contre'},
    {english: 'especially, above all', french: 'surtout'},
    {english: 'but', french: 'mais'},
    {english: 'a lot', french: 'beaucoup'},
    {english: 'quite, rather', french: 'assez'},
    {english: 'very', french: 'très'},
    {english: 'you', french: 'toi'},
    {english: 'I (subject)', french: 'je'},
    {english: 'my', french: 'mon, ma, mes'},
    {english: 'not (any)', french: 'ne…pas'},
    {english: 'friend(s)', french: 'ami(s)'},
    {english: 'brother', french: 'frère'},
    {english: 'sister', french: 'sœur'},
    {english: 'cycling', french: 'cyclisme'},
    {english: 'dance', french: 'la danse'},
    {english: 'TV', french: 'la télé'},
    {english: 'music', french: 'la musique'},
    {english: 'rugby', french: 'le rugby'},
    {english: 'sport', french: 'le sport'},
    {english: 'rap', french: 'le rap'},
    {english: 'football', french: 'le foot(ball)'},
    {english: 'chocolate', french: 'le chocolat'},
    {english: 'video games', french: 'les jeux vidéo'},
    {english: 'films', french: 'les films'},
    {english: 'snakes', french: 'les serpents'},
    {english: 'cake', french: 'le gâteau'},
    {english: '(to) really like, love, adore', french: 'adorer'},
    {english: '(to) like, love', french: 'aimer'},
    {english: '(to) prefer', french: 'préférer'},
    {english: '(to) hate, detest', french: 'détester'},
    {english: '(to) be', french: 'être'},
    
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
