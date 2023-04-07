const gameContainer = document.querySelector('.game-container');
const gridContainer = document.querySelector('.grid-container');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-button');
const gridSquares = document.querySelectorAll('.grid-square');

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let xTurn = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  xTurn = true;
  gridSquares.forEach(square => {
    square.classList.remove(X_CLASS);
    square.classList.remove(O_CLASS);
    square.textContent = "";
    square.removeEventListener('click', handleClick);
    square.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  gameStatus.innerText = '';
  gameContainer.classList.remove(O_CLASS);
  gameContainer.classList.add(X_CLASS);
}

function handleClick(event) {
  const square = event.target;
  const currentClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(square, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(square, currentPlayer) {
  square.textContent = currentPlayer;
}

function swapTurns() {
  xTurn = !xTurn;
}

function setBoardHoverClass() {
  gridContainer.classList.remove(X_CLASS);
  gridContainer.classList.remove(O_CLASS);
  if (xTurn) {
    gridContainer.classList.add(X_CLASS);
  } else {
    gridContainer.classList.add(O_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return gridSquares[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...gridSquares].every(square => {
    return square.classList.contains(X_CLASS) || square.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    gameStatus.innerText = 'Draw!';
  } else {
    gameStatus.innerText = `${xTurn ? "X's" : "O's"} Wins!`;
  }
  gridSquares.forEach(square => {
    square.removeEventListener('click', handleClick);
  });
}
