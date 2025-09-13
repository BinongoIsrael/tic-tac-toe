import React from "react";
import Square from "./Square";
import { type BoardState } from "../types";

interface BoardProps {
  squares: BoardState;
  onClick: (i: number) => void;
  isMiniBoard?: boolean;
}

const Board: React.FC<BoardProps> = ({
  squares,
  onClick,
  isMiniBoard = false,
}) => {
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      disabled={isMiniBoard}
    />
  );

  return (
    <div className={`board ${isMiniBoard ? "mini" : ""}`}>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
