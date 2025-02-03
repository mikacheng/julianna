const wordPairs = [
    { english: "pencil case", french: "la trousse" },
    { english: "pen", french: "le stylo" },
    { english: "pencil", french: "le crayon" },
    { english: "eraser", french: "la gomme" },
    { english: "ruler", french: "la règle" },
    { english: "sharpner", french: "le taille crayon" },
    { english: "classroom", french: "la classe" },
    { english: "book", french: "le livre" },
    // { english: "orange", french: "l’orange" },
    // { english: "apple", french: "la pomme" },
    // { english: "banana", french: "la banane" },
    // { english: "strawberry", french: "la fraise" },
    // { english: "cheese", french: "le fromage" },
    // { english: "egg", french: "l’oeuf" },
    // { english: "milk", french: "le lait" },
    // { english: "ice cream", french: "la glace" },
    // { english: "candy", french: "le bonbon" }
  ];
  
  let correctMatches = 0;
  
  // Shuffle array function
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Select a random subset of pairs
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
  
    // Select random pairs
    const selectedPairs = selectRandomPairs(wordPairs, 5);
  
    const shuffledEnglish = shuffleArray([...selectedPairs]);
    const shuffledFrench = shuffleArray([...selectedPairs]);
  
    // Populate English column
    shuffledEnglish.forEach(pair => {
      const wordBox = document.createElement("div");
      wordBox.textContent = pair.english;
      wordBox.classList.add("word-box");
      wordBox.dataset.word = pair.english;
  
      // Handle drag-and-drop for mouse
      wordBox.draggable = true;
      wordBox.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.dataset.word);
      });
  
      // Handle touch support
      wordBox.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Prevent scrolling/zooming delay
        wordBox.classList.add("dragging");
      });
  
      wordBox.addEventListener("touchend", () => {
        wordBox.classList.remove("dragging");
      });
  
      englishColumn.appendChild(wordBox);
    });
  
    // Populate French column
    shuffledFrench.forEach(pair => {
      const wordBox = document.createElement("div");
      wordBox.textContent = pair.french;
      wordBox.classList.add("word-box", "droppable");
      wordBox.dataset.word = pair.english;
  
      // Handle drag-and-drop for mouse
      wordBox.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
  
      wordBox.addEventListener("drop", (event) => {
        event.preventDefault();
        const droppedWord = event.dataTransfer.getData("text");
        processMatch(wordBox, droppedWord);
      });
  
      // Handle touch support
      wordBox.addEventListener("touchmove", (event) => {
        const draggingElement = document.querySelector(".dragging");
        if (draggingElement && draggingElement.dataset.word === wordBox.dataset.word) {
          processMatch(wordBox, draggingElement.dataset.word);
          draggingElement.remove();
        }
      });
  
      frenchColumn.appendChild(wordBox);
    });
  }
  
  // Process a match
  function processMatch(wordBox, droppedWord) {
    if (droppedWord === wordBox.dataset.word) {
      wordBox.classList.add("correct");
      wordBox.classList.remove("droppable");
      wordBox.textContent += ` (${droppedWord})`;
      correctMatches++;
  
      // Check if all matches are correct
      if (correctMatches === 5) {
        const result = document.getElementById("result");
        result.textContent = "Correct! 🎉 Well done!";
        result.style.color = "green";
      }
    } else {
      wordBox.classList.add("incorrect");
      setTimeout(() => wordBox.classList.remove("incorrect"), 1000);
    }
  }
  
  // Add reset functionality
  document.getElementById("reset-button").addEventListener("click", initializeGame);
  
  // Initialize the game on page load
  initializeGame();
  