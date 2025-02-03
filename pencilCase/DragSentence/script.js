const words = [
    "un stylo", "une gomme", "un crayon", "une règle", "un taille-crayon"
];

// Define the correct items for each picture (as sets for order-independent comparison)
const correctItems = {
    1: new Set(["une gomme", "un stylo"]),
    2: new Set(["une règle", "un taille-crayon"]),
    3: new Set(["un crayon", "un stylo"]),
    4: new Set(["une règle", "un crayon"]),
    5: new Set(["une gomme", "un taille-crayon"]),
    6: new Set(["un crayon", "un stylo"])
};

// Function to initialize the game
function initializeGame() {
    const wordContainer = document.getElementById("word-container");

    // Clear existing words
    wordContainer.innerHTML = "";

    // Add draggable words to the word bank
    words.forEach(word => {
        const wordElement = document.createElement("div");
        wordElement.classList.add("draggable-word");
        wordElement.textContent = word;
        wordElement.draggable = true;

        wordElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.textContent);
        });

        wordContainer.appendChild(wordElement);
    });

    // Add drop event listeners to blanks
    const blanks = document.querySelectorAll(".blank");
    blanks.forEach(blank => {
        blank.addEventListener("dragover", (event) => {
            event.preventDefault();
            blank.style.backgroundColor = "#bbdefb";
        });

        blank.addEventListener("dragleave", () => {
            blank.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        });

        blank.addEventListener("drop", (event) => {
            event.preventDefault();
            const word = event.dataTransfer.getData("text");
            const pictureItem = blank.closest(".picture-item");
            const picId = pictureItem.dataset.pic;

            // Check if the word is valid for this picture
            if (correctItems[picId].has(word)) {
                // Update the blank with the dropped word
                blank.textContent = word;
                blank.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                blank.classList.remove("incorrect");

                // Check if both blanks are filled
                const blanksInPicture = pictureItem.querySelectorAll(".blank");
                if (blanksInPicture[0].textContent !== "______" && blanksInPicture[1].textContent !== "______") {
                    checkAnswer(pictureItem, picId);
                }
            } else {
                // If the word is incorrect, do not drop it
                blank.classList.add("incorrect");
                setTimeout(() => {
                    blank.classList.remove("incorrect");
                }, 500); // Flash red for 500ms to indicate incorrect word
            }
        });
    });
}

// Function to check the answer for a specific picture
function checkAnswer(pictureItem, picId) {
    const blanksInPicture = pictureItem.querySelectorAll(".blank");
    const userAnswer = new Set([
        blanksInPicture[0].textContent,
        blanksInPicture[1].textContent
    ]);

    // Compare the user's answer with the correct items
    if (areSetsEqual(userAnswer, correctItems[picId])) {
        blanksInPicture.forEach(blank => {
            blank.classList.add("correct");
            blank.classList.remove("incorrect");
        });
    } else {
        blanksInPicture.forEach(blank => {
            blank.classList.add("incorrect");
            blank.classList.remove("correct");
        });
    }
}

// Helper function to compare two sets
function areSetsEqual(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
}

// Start the game
initializeGame();