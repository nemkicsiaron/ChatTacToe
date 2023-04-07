const cells = document.querySelectorAll('.cell');
let currentPlayer = 'x';

cells.forEach(cell => {
  cell.addEventListener('click', placeMark);
});

function placeMark(e) {
  const cell = e.target;
  if (cell.classList.contains('x') || cell.classList.contains('o')) {
    return;
  }
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWin() {
  const winningCombos = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const cellsArr = Array.from(cells);
  const currentPlayerCells = cellsArr.reduce((acc, cell, index) => {
    if (cell.classList.contains(currentPlayer)) {
      acc.push(index);
    }
    return acc;
  }, []);
  for (let combo of winningCombos) {
    if (combo.every(index => currentPlayerCells.includes(index))) {
      declareWinner();
      break;
    } else if (cellsArr.every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
      declareDraw();
      break;
    }
  }
}

function declareWinner() {
  alert(`Congratulations! Player ${currentPlayer.toUpperCase()} wins!`);
  resetBoard();
}

function declareDraw() {
  alert('It\'s a draw!');
  resetBoard();
}

function resetBoard() {
  cells.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('o');
  });
  currentPlayer = 'x';
}
