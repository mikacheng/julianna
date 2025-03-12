const items = [
    { type: 'image', content: 'images/arbre.jpg', match: 'arbre' },
    { type: 'image', content: 'images/cactus.jpg', match: 'cactus' },
    { type: 'image', content: 'images/lavande.jpg', match: 'lavande' },
    { type: 'image', content: 'images/feuille.jpg', match: 'feuille' },
    { type: 'image', content: 'images/fleur.jpg', match: 'fleur' },
    { type: 'image', content: 'images/pissenlit.jpg', match: 'pissenlit' },
    { type: 'image', content: 'images/rose.jpg', match: 'rose' },
    { type: 'image', content: 'images/herbe.jpg', match: 'herbe' },
    { type: 'image', content: 'images/champignon.jpg', match: 'champignon' },
    { type: 'image', content: 'images/tulipe.jpg', match: 'tulipe' },
    { type: 'image', content: 'images/tournesol.jpg', match: 'tournesol' },
    { type: 'word', content: 'un tournesol', match: 'tournesol' },
    { type: 'word', content: 'une tulipe', match: 'tulipe' },
    { type: 'word', content: 'un champignon', match: 'champignon' },
    { type: 'word', content: 'un arbre', match: 'arbre' },
    { type: 'word', content: 'un cactus', match: 'cactus' },
    { type: 'word', content: 'une lavande', match: 'lavande' },
    { type: 'word', content: 'une feuille', match: 'feuille' },
    { type: 'word', content: 'une fleur', match: 'fleur' },
    { type: 'word', content: 'un pissenlit', match: 'pissenlit' },
    { type: 'word', content: 'une rose', match: 'rose' },
    { type: 'word', content: "une herbe", match: 'herbe' },

];

// Function to randomly select 8 images and 8 words
function selectRandomItems(items) {
    const images = items.filter(item => item.type === 'image');
    const words = items.filter(item => item.type === 'word');

    // Shuffle images and words
    const shuffledImages = images.sort(() => Math.random() - 0.5);
    const shuffledWords = words.sort(() => Math.random() - 0.5);

    // Select first 8 images and their corresponding words
    const selectedImages = shuffledImages.slice(0, 8);
    const selectedWords = selectedImages.map(image => 
        shuffledWords.find(word => word.match === image.match)
    );

    // Combine selected images and words
    return [...selectedImages, ...selectedWords].sort(() => Math.random() - 0.5);
}

const selectedItems = selectRandomItems(items);

// Create game board
const memoryGame = document.getElementById('memory-game');
selectedItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.match = item.match;
    if (item.type === 'image') {
        card.innerHTML = `<img src="${item.content}" alt="${item.match}">`;
    } else {
        card.innerHTML = `<span>${item.content}</span>`;
    }
    memoryGame.appendChild(card);
});

// Show all cards for 5 seconds at the start
function showAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('flipped'));

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
    }, 5000); // 5 seconds
}

showAllCards();

let firstCard = null;
let secondCard = null;
let matches = 0;

// Handle card flip
memoryGame.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.card');
    if (!clickedCard || clickedCard.classList.contains('flipped')) return;

    clickedCard.classList.add('flipped');
    if (!firstCard) {
        firstCard = clickedCard;
    } else if (!secondCard) {
        secondCard = clickedCard;

        // Check for match
        if (firstCard.dataset.match === secondCard.dataset.match) {
            matches += 1;
            firstCard = null;
            secondCard = null;

            // Check if all pairs are matched
            if (matches === selectedItems.length / 2) {
                document.getElementById('result').textContent = 'Congratulations! 🎉 You matched all pairs!';
            }
        } else {
            // Flip cards back after a delay
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
});