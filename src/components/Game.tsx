import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner } from "../utils/calculateWinner";
import { type BoardState, type SquareValue, type GameMode } from "../types";

interface GameProps {
  mode: GameMode;
}
const Game: React.FC<GameProps> = ({ mode }) => {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(squares);
  const isPvC = mode === "pvc";

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    if (isPvC && !xIsNext && !winner) {
      const emptyIndices = squares
        .map((val, idx) => (val === null ? idx : null))
        .filter((idx): idx is number => idx !== null);
      if (emptyIndices.length > 0) {
        const randomMove =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newSquares = [...squares];
        newSquares[randomMove] = "O";
        setTimeout(() => {
          setSquares(newSquares);
          setXIsNext(true);
        }, 500);
      }
    }
  }, [squares, xIsNext, winner, isPvC]);

  const isBoardFull = squares.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "Draw"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <Board squares={squares} onClick={handleClick} status={status} />
      <button className="reset-button" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
};

export default Game;
