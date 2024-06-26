import { useState } from "react";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({handleSelectSquare, turn}) => {
  let gameBoard = intialGameBoard;

  for(let turnData of turn){
      const {square, player} = turnData;
      const {row, col} = square;

      gameBoard[row][col] = player
  }
  // const [gameBoard, setGameBoard] = useState(intialGameBoard);

  // function handleSelectSqare(row, col) {
  //   console.log("sss",row, col)
  //   setGameBoard((prevGameBoard) => {
  //     let updatedGameBoard = [...prevGameBoard];
  //     updatedGameBoard[row][col] = activePlayer;
  //     return updatedGameBoard;
  //   });
  //   handleSelectSquare()
  // }

  // console.log(gameBoard)

  return (
    <ol className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={handleSelectSquare}
                  
                >
                  {/* {console.log(rowIndex, columnIndex)} */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
