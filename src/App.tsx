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
  const [winner, setWinner] = useState<boolean | undefined | null>(undefined);

  const clickCase = (i: number, j: number) => {
    if (winner === undefined && gameMatrix[i][j] === null) {
      setGameMatrix((oldGameMatrix) => {
        const newMatrix = oldGameMatrix.slice();
        newMatrix[i][j] = currPlayer;

        const winner = getGameWinner(newMatrix);
        if (winner !== undefined) {
          setWinner(winner);
        } else {
          setCurrPlayer(!currPlayer);
        }
        return newMatrix;
      });
    }
  };

  const getGameWinner = (matrix: Array<Array<null | boolean>>) => {
    for (let i = 0; i < matrix.length; i++) {
      if (
        isRowFilledBySamePlayer(matrix[i]) ||
        isColFilledBySamePlayer(matrix, i)
      ) {
        return currPlayer;
      }
    }
    if (isADiagonalFilled(matrix)) return currPlayer;
    if (isGameBoardFull(matrix)) return null;
    return undefined;
  };

  const isGameBoardFull = (matrix: Array<Array<boolean | null>>) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === null) return false;
      }
    }
    return true;
  };

  const isADiagonalFilled = (matrix: Array<Array<boolean | null>>) => {
    // Diagonal from top left to bottom right
    if (
      matrix[0][0] !== null &&
      matrix[0][0] === matrix[1][1] &&
      matrix[0][0] === matrix[2][2]
    ) {
      return true;
    }

    // Diagonal from top right to bottom left
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
    setWinner(undefined);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>Game {winner !== undefined ? "Over" : "Ongoing"}</h2>
      {winner === undefined && (
        <p>
          {"Player "}
          {currPlayer === false && <span>1</span>}
          {currPlayer === true && <span>2</span>}
          {"'s turn"}
        </p>
      )}
      {winner !== undefined && (
        <p>
          {"Winner is: "}
          {winner === null && <span>Nobody.</span>}
          {winner === false && <span>Player 1</span>}
          {winner === true && <span>Player 2</span>}
        </p>
      )}
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
