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
    const board = Array.from(cells).map(cell => cell.dataset.mark);
    const move = getBestMove(board);

    if (move !== undefined) {
        cells[move].dataset.mark = currentPlayer;
        const img = cells[move].querySelector('img');
        img.src = currentPlayer === 'X' ? xImageURL : oImageURL;
        img.alt = currentPlayer;
        img.style.display = 'block';
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
        messageElement.textContent = `玩家 ${currentPlayer} 胜出咯!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        return;
    } else if (getEmptyCells().length === 0) {
        messageElement.textContent = '平手咯!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    computerMove();

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `玩家 ${currentPlayer} 输掉咯!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        return;
    } else if (getEmptyCells().length === 0) {
        messageElement.textContent = '平手咯!';
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
function minimax(board, depth, isMaximizing) {
    // ...
}

function getBestMove(board) {
    // ...
}

function isBoardFull(board) {
    // ...
}

function checkWinOnBoard(board) {
    // ...
}
function minimax(board, depth, isMaximizing) {
    let winner = checkWinOnBoard(board);
    if (winner !== null) {
        return winner === 'X' ? -1 : 1;
    }

    if (depth === 0 || isBoardFull(board)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'O';
                let score = minimax(board, depth - 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = 'X';
                let score = minimax(board, depth - 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = 'O';
            let score = minimax(board, 3, false);
            board[i] = null;

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function computerMove() {
    const board = Array.from(cells).map(cell => cell.dataset.mark);
    const move = getBestMove(board);

    if (move !== undefined) {
        cells[move].dataset.mark = currentPlayer;
        cells[move].textContent = currentPlayer;
    }
}
