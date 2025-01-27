const items = [
  { type: 'image', content: 'images/poulet.jpg', match: 'poulet' },
  { type: 'image', content: 'images/boeuf.jpg', match: 'boeuf' },
  { type: 'image', content: 'images/fraise.jpg', match: 'fraise' },
  { type: 'image', content: 'images/glace.jpg', match: 'glace' },
  { type: 'image', content: 'images/tomate.jpg', match: 'tomate' },
  { type: 'image', content: 'images/carotte.jpg', match: 'carotte' },
  { type: 'image', content: 'images/lait.jpg', match: 'lait' },
  { type: 'image', content: 'images/oeuf.jpg', match: 'oeuf' },
  { type: 'word', content: 'le poulet', match: 'poulet' },
  { type: 'word', content: 'le boeuf', match: 'boeuf' },
  { type: 'word', content: 'la fraise', match: 'fraise' },
  { type: 'word', content: 'la glace', match: 'glace' },
  { type: 'word', content: 'la tomate', match: 'tomate' },
  { type: 'word', content: 'la carotte', match: 'carotte' },
  { type: 'word', content: 'le lait', match: 'lait' },
  { type: 'word', content: "l'oeuf", match: 'oeuf' },
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
