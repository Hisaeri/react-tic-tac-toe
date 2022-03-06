import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [gameMatrix, setGameMatrix] = useState<Array<Array<null | boolean>>>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currPlayer, setCurrPlayer] = useState<boolean>(false);

  const clickCase = (i: number, j: number) => {
    if (gameMatrix[i][j] === null) {
      setGameMatrix((oldGameMatrix) => {
        const newMatrix = oldGameMatrix.slice();
        newMatrix[i][j] = currPlayer;
        setCurrPlayer(!currPlayer);
        return newMatrix;
      });
    }
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <GameBoard
        gameMatrix={gameMatrix}
        currPlayer={currPlayer}
        clickCase={clickCase}
      ></GameBoard>
      <div>Winner / Turn</div>
    </div>
  );
};

export default App;
