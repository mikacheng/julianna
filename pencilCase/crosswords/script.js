document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell[data-word]');

  cells.forEach(cell => {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      cell.appendChild(input);

      input.addEventListener('input', (event) => {
          const letter = event.target.value.toUpperCase();
          event.target.value = letter;

          // Check if the letter is correct
          const word = cell.dataset.word.toUpperCase();
          const position = parseInt(cell.dataset.position);
          if (word[position - 1] === letter) {
              cell.style.backgroundColor = '#e8f5e9'; // Green for correct
          } else {
              cell.style.backgroundColor = '#ffebee'; // Red for incorrect
          }
      });
  });
});