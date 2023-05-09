const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';

function checkWin(mark) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombinations.some(combination =>
        combination.every(index => cells[index].dataset.mark === mark)
    );
}

function getEmptyCells() {
    return Array.from(cells).filter(cell => !cell.dataset.mark);
}

function computerMove() {
    const emptyCells = getEmptyCells();

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const chosenCell = emptyCells[randomIndex];
        chosenCell.dataset.mark = currentPlayer;
        chosenCell.textContent = currentPlayer;
    }
}

function handleClick(event) {
    const cell = event.target;

    if (cell.dataset.mark) {
        return;
    }

    cell.dataset.mark = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        return;
    } else if (getEmptyCells().length === 0) {
        messageElement.textContent = 'Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    computerMove();

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        return;
    } else if (getEmptyCells().length === 0) {
        messageElement.textContent = 'Draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

// Add the event listener for the reset button
const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    location.reload();
});
