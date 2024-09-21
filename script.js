const cardsArray = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function createBoard() {
  shuffle(cardsArray);
  cardsArray.forEach(cardContent => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = cardContent;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  const firstCardContent = firstCard.querySelector('.card-back').textContent;
  const secondCardContent = secondCard.querySelector('.card-back').textContent;

  let isMatch = firstCardContent === secondCardContent;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  gameBoard.innerHTML = '';
  createBoard();
  resetBoard();
}

document.getElementById('restart').addEventListener('click', restartGame);

createBoard();
