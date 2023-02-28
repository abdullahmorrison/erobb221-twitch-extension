import {Tile} from './Board'

export default function checkBingo(board: Tile[]){
  const chipsInARow = 5
  if(checkRowBingo(board, chipsInARow)
  || checkColumnBingo(board, chipsInARow)
  || checkDiagonalBingo(board, chipsInARow)) {
    console.log('BINGO!')
  }
}

const checkRowBingo = (board: Tile[], chipsInARow: number) =>{
  for(let i = 0; i < board.length; i += chipsInARow){
    let chipsInARowCounter = 0
    for(let j = 0; j < chipsInARow; j++){
      if(board[i + j].clicked) chipsInARowCounter++
    }
    if(chipsInARowCounter === chipsInARow) return true
  }
  return false
}
const checkColumnBingo = (board: Tile[], chipsInARow: number) => {
  for(let i = 0; i < chipsInARow; i++){
    let chipsInARowCounter = 0
    for(let j = 0; j < board.length; j += chipsInARow){
      if(board[i + j].clicked){
        chipsInARowCounter++
      }
    }
    if(chipsInARowCounter === chipsInARow) return true
  }
  return false
}
const checkDiagonalBingo = (board: Tile[], chipsInARow: number) => {
  let chipsInARowCounter = 0
  // Check diagonal from top left to bottom right
  for(let i = 0; i < board.length; i += chipsInARow + 1){
    if(board[i].clicked) chipsInARowCounter++
  }
  if(chipsInARowCounter === chipsInARow) return true

  chipsInARowCounter = 0
  // Check diagonal from top right to bottom left
  for(let i = chipsInARow - 1; i < board.length - 1; i += chipsInARow - 1){
    if(board[i].clicked) chipsInARowCounter++
  }
  if(chipsInARowCounter === chipsInARow) return true

  return false
}
