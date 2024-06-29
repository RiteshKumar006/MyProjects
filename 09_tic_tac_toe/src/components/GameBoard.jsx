// import { useState } from "react";
const GameBoard = ({handleSelectSquare, board}) => {
  return (
    <ol className="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={()=> handleSelectSquare(rowIndex, columnIndex)}
                  
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
