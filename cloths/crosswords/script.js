const crosswordGrid = [
  ['c', 'h', 'a', 'u', 's', 's', 'e', 't', 't', 'e', 's', ''],  // chaussettes
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', 'c', 'h', 'e', 'm', 'i', 's', 'e', '', '', ''],      // chemise
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', 'p', '', '', '', '', '', ''],            // pantalon (vertical)
  ['', '', '', '', '', 'a', '', '', '', '', '', ''],
  ['', '', '', '', '', 'n', '', 'j', 'u', 'p', 'e', ''],        // jupe
  ['', '', '', '', '', 't', '', '', '', '', '', ''],
  ['', '', '', '', '', 'a', '', '', '', '', '', ''],
  ['', '', '', '', '', 'l', '', '', '', '', '', ''],
  ['', '', '', '', '', 'o', '', '', '', '', '', ''],
  ['', '', '', '', '', 'n', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
];

const solutionGrid = [
  ['c', 'h', 'a', 'u', 's', 's', 'e', 't', 't', 'e', 's', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', 'c', 'h', 'e', 'm', 'i', 's', 'e', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', 'p', '', '', '', '', '', ''],
  ['', '', '', '', '', 'a', '', '', '', '', '', ''],
  ['', '', '', '', '', 'n', '', 'j', 'u', 'p', 'e', ''],
  ['', '', '', '', '', 't', '', '', '', '', '', ''],
  ['', '', '', '', '', 'a', '', '', '', '', '', ''],
  ['', '', '', '', '', 'l', '', '', '', '', '', ''],
  ['', '', '', '', '', 'o', '', '', '', '', '', ''],
  ['', '', '', '', '', 'n', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
];

const crossword = document.getElementById('crossword');

// Create crossword grid
crosswordGrid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell !== '') {
          cellElement.setAttribute('contenteditable', 'true');
          cellElement.dataset.row = rowIndex;
          cellElement.dataset.col = colIndex;
      }
      crossword.appendChild(cellElement);
  });
});

// Check answers
document.getElementById('check-button').addEventListener('click', () => {
  const cells = document.querySelectorAll('.cell[contenteditable="true"]');
  let allCorrect = true;

  cells.forEach(cell => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      const userAnswer = cell.textContent.trim().toLowerCase();
      const correctAnswer = solutionGrid[row][col];

      if (userAnswer === correctAnswer) {
          cell.classList.add('correct');
          cell.classList.remove('incorrect');
      } else {
          cell.classList.add('incorrect');
          cell.classList.remove('correct');
          allCorrect = false;
      }
  });

  const result = document.getElementById('result');
  if (allCorrect) {
      result.textContent = 'Congratulations! 🎉 You completed the crossword!';
      result.style.color = 'green';
  } else {
      result.textContent = 'Some answers are incorrect. Try again!';
      result.style.color = 'red';
  }
});
