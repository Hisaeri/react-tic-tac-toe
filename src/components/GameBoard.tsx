type GameProps = {
  gameMatrix: Array<Array<null | boolean>>;
  currPlayer: boolean;
  clickCase: Function;
};

export const GameBoard = (props: GameProps) => {
  return (
    <div>
      {props.gameMatrix.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((col, j) => {
              return (
                <button
                  className={"case-btn case-btn_" + col}
                  key={j}
                  onClick={() => props.clickCase(i, j)}
                >
                  {col === true && <span>O</span>}
                  {col === false && <span>X</span>}
                  {col === null && <span></span>}
                </button>
              );
            })}
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default GameBoard;
