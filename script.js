const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');
const resetButton = document.getElementById('reset-button');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let winner = null;

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

resetButton.addEventListener('click', resetGame);

function renderBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function handleClick(index) {
  if (board[index] === null && winner === null) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    winner = checkWinner(board);
    renderBoard();
    displayWinner();

    if (!winner && !isBoardFull(board)) {
      const bestMove = findBestMove(board);
      board[bestMove] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      winner = checkWinner(board);
      renderBoard();
      displayWinner();
    }
  }
}

function checkWinner(board) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function displayWinner() {
  if (winner === 'X') {
    winnerMessage.textContent = '恭喜你胜出!';
  } else if (winner === 'O') {
    winnerMessage.textContent = '你已败北！';
  } else if (isBoardFull(board)) {
    winnerMessage.textContent = '可惜！居然达成平手。';
  }
}


function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

function findBestMove(board) {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 5, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const winner = checkWinner(board);

  if (winner !== null) {
    return winner === 'X' ? -10 : 10;
  }

  if (depth === 0 || isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth - 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
    board[i] = 'X';
    const score = minimax(board, depth - 1, true);
    board[i] = null;
    bestScore = Math.min(score, bestScore);
    }
    }
    return bestScore;
    }
    }
    
    function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    winner = null;
    winnerMessage.textContent = '';
    renderBoard();
    }
    
    renderBoard();