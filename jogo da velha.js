const cellElements = document.querySelectorAll('[data-cell]')

const board = document.querySelector('[data-board]')

const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]')

const winmessage = document.querySelector('[data-winning-message]')

const restartButton = document.querySelector('[restart-button]')

let isCirculoTurn;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const startGame = () => {
  for (const cell of cellElements) {
    cell.classList.remove('circulo','x')
    cell.removeEventListener("click",handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  }
  isCirculoTurn = false;
  
 setBoardHoverClass();
 winmessage.classList.remove('show-winnig-message');
};

const endGame = (isDraw) => {
  if (isDraw) { winningMessageTextElement.innerText ='Empate!'
  } else { winningMessageTextElement.innerText = isCirculoTurn
      ? ' O Circulo Venceu!!'
      : ' X venceu!!'};

  winmessage.classList.add('show-winnig-message')

  
};

const checkForWinn = currentPlayer => {
  return winCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}
  const checkForDraw = () =>{
    return[...cellElements].every(cell=>{
      return cell.classList.contains('x') | cell.classList.contains('circulo');
    })
  };


const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd)
};
const setBoardHoverClass = () =>{
  board.classList.remove('circulo')
  board.classList.remove('x')

  if (isCirculoTurn) {
    board.classList.add('circulo')
  }
  else {
    board.classList.add('x')
  }
}

const swapTurns = () => {
  isCirculoTurn = !isCirculoTurn;
  setBoardHoverClass ();
  
};

const handleClick = (e) => {
    //colocar a marca (X ou Circulo)
    const cell = e.target
    const classToAdd = isCirculoTurn ? 'circulo' : 'x';
    placeMark(cell, classToAdd)
    //troca o simbolo
    
    //verificar a vitória
    const isWin = checkForWinn(classToAdd);
    //verificar empate
    const isDraw = checkForDraw();
    if (isWin) { 
      endGame(false);
    } else if(isDraw){
      endGame(true);
    } else{
      swapTurns();
    }
    
};

startGame()
restartButton.addEventListener("click",startGame);

