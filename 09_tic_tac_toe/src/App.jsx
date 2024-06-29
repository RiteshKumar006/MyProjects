import { useState } from 'react'
import GameBoard from "./components/GameBoard";
import PlayerName from "./components/Players";
import {WINNING_COMBINATIONS} from './winning-combinations'
import "./App.css";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePLayer(gameTurn){
  let currentPlayer ='X'

  if(gameTurn.length > 0 && gameTurn[0].player === "X" ){
      currentPlayer = "O"
  }

  return currentPlayer;

}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')
  let gameBoard = intialGameBoard;

  for(let turnData of gameTurns){
      const {square, player} = turnData;
      const {row, col} = square;

      gameBoard[row][col] = player
  }

  let winning = null;

  for(let combination of WINNING_COMBINATIONS){
    console.log(combination)
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winning = firstSquareSymbol
    }
  }



  function handleSelectSquare(row, col){
      setGameTurns((prevTurn) => {

        let currentPlayer = deriveActivePLayer(prevTurn)
        let updatedTurns = [{square:{col,row}, player: currentPlayer},...prevTurn]

        return updatedTurns;
      })
  }

  return (
    <>
      <div className="game-container">
        <ol className="players">
          <PlayerName playerName={"Player1"} symbol="X" />
          <PlayerName playerName={"Player2"}  symbol ="O"/>
        </ol>
        {winning && <p>You won the match {winning}  </p>}
        <GameBoard handleSelectSquare={handleSelectSquare} board ={gameBoard} />
      </div>
    </>
  );
}

export default App;
