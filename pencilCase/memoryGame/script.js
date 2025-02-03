const items = [
  { type: 'image', content: 'images/gomme.jpg', match: 'gomme' },
  { type: 'image', content: 'images/regle.jpg', match: 'regle' },
  { type: 'image', content: 'images/stylo.jpg', match: 'stylo' },
  { type: 'image', content: 'images/taillecrayon.jpg', match: 'taillecrayon' },
  { type: 'image', content: 'images/trousse.jpg', match: 'trousse' },
  { type: 'image', content: 'images/classroom.jpg', match: 'classe' },
  { type: 'image', content: 'images/crayon.jpg', match: 'crayon' },
  { type: 'image', content: 'images/livre.jpg', match: 'livre' },
  { type: 'word', content: 'la gomme', match: 'gomme' },
  { type: 'word', content: 'la règle', match: 'regle' },
  { type: 'word', content: 'le stylo', match: 'stylo' },
  { type: 'word', content: 'le taille crayon', match: 'taillecrayon' },
  { type: 'word', content: 'la trousse', match: 'trousse' },
  { type: 'word', content: 'la classe', match: 'classe' },
  { type: 'word', content: 'le crayon', match: 'crayon' },
  { type: 'word', content: "le livre", match: 'livre' },
];


// Shuffle items
const shuffledItems = items.sort(() => Math.random() - 0.5);

// Create game board
const memoryGame = document.getElementById('memory-game');
shuffledItems.forEach((item, index) => {
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
          if (matches === items.length / 2) {
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
