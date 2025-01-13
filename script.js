const draggables = document.querySelectorAll('.draggable-word');
const dropTargets = document.querySelectorAll('.drop-target');
const checkButton = document.getElementById('check-answer');
const result = document.getElementById('result');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.textContent);
    });
});

dropTargets.forEach(target => {
    target.addEventListener('dragover', (event) => {
        event.preventDefault();
        target.classList.add('drag-over');
    });

    target.addEventListener('dragleave', () => {
        target.classList.remove('drag-over');
    });

    target.addEventListener('drop', (event) => {
        event.preventDefault();
        target.classList.remove('drag-over');
        const word = event.dataTransfer.getData('text');
        target.textContent = word;
    });
});

checkButton.addEventListener('click', () => {
    const expectedAnswer = ["Je", "mange", "la", "petite", "pomme"];
    const userAnswer = Array.from(dropTargets).map(target => target.textContent.trim());
    
    if (JSON.stringify(userAnswer) === JSON.stringify(expectedAnswer)) {
        result.textContent = "Correct! 🎉 Bien fait!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect! 😔 Essayez encore.";
        result.style.color = "red";
    }
});
