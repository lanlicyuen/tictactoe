const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const xImageURL = 'path/to/your/x-image.png';
const oImageURL = 'path/to/your/o-image.png';
let currentPlayer = 'X';

function checkWin(mark) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(combination =>
        combination.every(index => cells[index].dataset.mark === mark)
    );
}

function handleClick(event) {
    const cell = event.target;

    if (cell.dataset.mark) {
        return;
    }

    cell.dataset.mark = currentPlayer;
    const img = cell.querySelector('img');
    img.src = currentPlayer === 'X' ? xImageURL : oImageURL;
    img.alt = currentPlayer;
    img.style.display = 'block';

    if (checkWin(currentPlayer)) {
        messageElement.textContent = `${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (Array.from(cells).every(cell => cell.dataset.mark)) {
        messageElement.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            computerMove();
            if (checkWin(currentPlayer)) {
                messageElement.textContent = `${currentPlayer} wins!`;
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
            } else {
                currentPlayer = 'X';
            }
        }
    }
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

function isBoardFull(board) {
    return board.every(cell => cell !== null);
}

function checkWinOnBoard(board) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

// Add the event listener for the reset button
const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    location.reload();
});
