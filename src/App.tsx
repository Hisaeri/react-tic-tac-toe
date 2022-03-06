import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";

const App = () => {
  const baseMatrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [gameMatrix, setGameMatrix] =
    useState<Array<Array<null | boolean>>>(baseMatrix);
  const [currPlayer, setCurrPlayer] = useState<boolean>(false);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);

  const clickCase = (i: number, j: number) => {
    if (!gameIsOver && gameMatrix[i][j] === null) {
      setGameMatrix((oldGameMatrix) => {
        const newMatrix = oldGameMatrix.slice();
        newMatrix[i][j] = currPlayer;
        if (isGameOver(newMatrix)) {
          setGameIsOver(true);
        } else {
          setCurrPlayer(!currPlayer);
        }
        return newMatrix;
      });
    }
  };

  const isGameOver = (matrix: Array<Array<null | boolean>>) => {
    for (let i = 0; i < matrix.length; i++) {
      if (
        isRowFilledBySamePlayer(matrix[i]) ||
        isColFilledBySamePlayer(matrix, i)
      ) {
        return true;
      }
    }
    if (isADiagonalFilled(matrix)) return true;
    return false;
  };

  const isADiagonalFilled = (matrix: Array<Array<boolean | null>>) => {
    if (
      matrix[0][0] !== null &&
      matrix[0][0] === matrix[1][1] &&
      matrix[0][0] === matrix[2][2]
    ) {
      return true;
    }
    if (
      matrix[0][2] !== null &&
      matrix[0][2] === matrix[1][1] &&
      matrix[0][2] === matrix[2][0]
    ) {
      return true;
    }
    return false;
  };

  const isColFilledBySamePlayer = (
    matrix: Array<Array<boolean | null>>,
    col: number
  ) => {
    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i][col] === null || matrix[i][col] !== matrix[i - 1][col]) {
        return false;
      }
    }
    return true;
  };

  const isRowFilledBySamePlayer = (row: Array<boolean | null>) => {
    for (let i = 1; i < row.length; i++) {
      if (row[i] === null || row[i] !== row[i - 1]) {
        return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setGameMatrix(baseMatrix);
    setCurrPlayer(false);
    setGameIsOver(false);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>Game {gameIsOver ? "Over" : "Ongoing"}</h2>
      <p>
        {"Player "}
        {currPlayer === false && <span>1</span>}
        {currPlayer === true && <span>2</span>}
        {gameIsOver && <span>{" wins."}</span>}
        {!gameIsOver && <span> {"'s turn"}</span>}
      </p>
      <GameBoard
        gameMatrix={gameMatrix}
        currPlayer={currPlayer}
        clickCase={clickCase}
      ></GameBoard>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
