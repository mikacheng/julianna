const items = [
  { type: 'image', content: 'images/chemise.jpg', match: 'chemise' },
  { type: 'image', content: 'images/pantalon.jpg', match: 'pantalon' },
  { type: 'image', content: 'images/jupe.jpg', match: 'jupe' },
  { type: 'image', content: 'images/robe.jpg', match: 'robe' },
  { type: 'image', content: 'images/pull.jpg', match: 'chapeau' },
  { type: 'image', content: 'images/tshirt.jpg', match: 'manteau' },
  { type: 'image', content: 'images/chaussettes.jpg', match: 'chaussettes' },
  { type: 'image', content: 'images/chaussures.jpg', match: 'chaussures' },
  { type: 'word', content: 'chemise', match: 'chemise' },
  { type: 'word', content: 'pantalon', match: 'pantalon' },
  { type: 'word', content: 'jupe', match: 'jupe' },
  { type: 'word', content: 'robe', match: 'robe' },
  { type: 'word', content: 'pull', match: 'chapeau' },
  { type: 'word', content: 'tshirt', match: 'manteau' },
  { type: 'word', content: 'chaussettes', match: 'chaussettes' },
  { type: 'word', content: 'chaussures', match: 'chaussures' },
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
