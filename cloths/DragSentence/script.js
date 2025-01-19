const sentences = [
    { french: "Je mange la petite pomme", english: "I eat the small apple" },
    { french: "Il regarde la grande maison", english: "He looks at the big house" },
    { french: "Nous aimons les belles fleurs", english: "We love the beautiful flowers" },
    { french: "Elle joue avec son chat mignon", english: "She plays with her cute cat" },
    { french: "Vous écrivez une lettre importante", english: "You write an important letter" }
];

let correctAnswer = [];

// Function to initialize the game
function initializeGame() {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    correctAnswer = randomSentence.french.split(" ");
    const shuffledWords = [...correctAnswer].sort(() => Math.random() - 0.5);

    const wordContainer = document.getElementById("word-container");
    const dropContainer = document.getElementById("drop-container");
    const translation = document.getElementById("translation");
    const result = document.getElementById("result");

    wordContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    result.textContent = "";
    translation.textContent = `English: ${randomSentence.english}`;

    shuffledWords.forEach(word => {
        const wordElement = document.createElement("div");
        wordElement.classList.add("draggable-word");
        wordElement.textContent = word;
        wordElement.draggable = true;

        wordElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.textContent);
        });

        wordElement.addEventListener("dragend", () => {
            wordElement.style.visibility = "hidden"; // Hide the word after dragging
        });

        wordContainer.appendChild(wordElement);
    });

    correctAnswer.forEach(() => {
        const dropTarget = document.createElement("div");
        dropTarget.classList.add("drop-target");

        dropTarget.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropTarget.classList.add("drag-over");
        });

        dropTarget.addEventListener("dragleave", () => {
            dropTarget.classList.remove("drag-over");
        });

        dropTarget.addEventListener("drop", (event) => {
            event.preventDefault();
            dropTarget.classList.remove("drag-over");

            const word = event.dataTransfer.getData("text");
            if (!dropTarget.textContent) {
                dropTarget.textContent = word;

                // Check if all words are placed
                if (Array.from(document.querySelectorAll(".drop-target")).every(target => target.textContent)) {
                    checkAnswer();
                }
            }
        });

        dropContainer.appendChild(dropTarget);
    });
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = Array.from(document.querySelectorAll(".drop-target")).map(target => target.textContent.trim());
    const result = document.getElementById("result");

    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        result.textContent = "Correct! 🎉 Bien fait!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect! 😔 Essayez encore.";
        result.style.color = "red";
    }
}

// Event listener for the reset button
document.getElementById("reset-button").addEventListener("click", initializeGame);

// Start the game
initializeGame();
