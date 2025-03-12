const wordPairs = [
  { english: "tree", french: "arbre" },
  { english: "cactus", french: "cactus" },
  { english: "mushroom", french: "champignon" },
  { english: "leaf", french: "feuille" },
  { english: "flower", french: "fleur" },
  { english: "grass", french: "herbe" },
  { english: "lavander", french: "lavande" },
  { english: "rose", french: "rose" },
  { english: "sunflower", french: "tournesol" },
  { english: "tulip", french: "tulipe" },
  { english: "dandelion", french: "pissenlit" },
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
