import { useState } from 'react'
import GameBoard from "./components/GameBoard";
import PlayerName from "./components/Players";
import "./App.css";

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

  function handleSelectSquare(row, col){
      // setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X")
      setGameTurns((prevTurn) => {

        let currentPlayer = deriveActivePLayer(prevTurn)
        // let currentPlayer = 'X'
        // if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
        //   currentPlayer='O'
        // }
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
        <GameBoard handleSelectSquare={handleSelectSquare} turn ={gameTurns} />
      </div>
    </>
  );
}

export default App;
