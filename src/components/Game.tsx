import React, { useState, useEffect } from "react";
import Board from "./Board";
import Modal from "./Modal";
import { calculateWinner } from "../utils/calculateWinner";
import { findBestMove } from "../utils/minimax";
import { type BoardState, type GameMode } from "../types";

interface GameProps {
  mode: GameMode;
  resetMode: () => void;
}

const Game: React.FC<GameProps> = ({ mode, resetMode }) => {
  const [history, setHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [minimaxProbability, setMinimaxProbability] = useState<number>(50);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isPvC = mode === "pvc";
  const [showModal, setShowModal] = useState<boolean>(false);
  const isBoardFull = currentSquares.every((square) => square !== null);

  const handlePlay = (nextSquares: BoardState) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleClick = (i: number) => {
    if (winner || currentSquares[i]) return;
    const nextSquares = [...currentSquares];
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  };

  useEffect(() => {
    if (isPvC && !xIsNext && !winner) {
      const emptyIndices = currentSquares
        .map((val, idx) => (val === null ? idx : null))
        .filter((idx): idx is number => idx !== null);
      if (emptyIndices.length > 0) {
        let move: number;
        if (Math.random() * 100 < minimaxProbability) {
          // Minimax move
          move = findBestMove(currentSquares);
        } else {
          // Random move
          move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }
        const nextSquares = [...currentSquares];
        nextSquares[move] = "O";
        setTimeout(() => {
          handlePlay(nextSquares);
        }, 500);
      }
    }
  }, [currentSquares, xIsNext, winner, isPvC, minimaxProbability]);

  useEffect(() => {
    if (winner || isBoardFull) {
      setShowModal(true);
    }
  }, [winner, isBoardFull]);

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
    setShowModal(false);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const prevSquares = history[move - 1];
      const changedIndex = squares.findIndex(
        (val, i) => val !== prevSquares[i]
      );
      const row = Math.floor(changedIndex / 3) + 1;
      const col = (changedIndex % 3) + 1;
      description = `Move #${move}: ${squares[changedIndex]} at (${row},${col})`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          className={move === currentMove ? "active" : ""}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowModal(false);
  };

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "Draw"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        {isPvC && (
          <div className="difficulty">
            <label htmlFor="difficulty-slider">
              AI Difficulty (Minimax %): {minimaxProbability}
            </label>
            <input
              id="difficulty-slider"
              type="range"
              min="0"
              max="100"
              value={minimaxProbability}
              onChange={(e) => setMinimaxProbability(Number(e.target.value))}
            />
          </div>
        )}
        <Board squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <h3>Move History</h3>
        <ol className="history">{moves}</ol>
        <div className="game-buttons">
          <button className="reset-button" onClick={resetGame}>
            Restart Game
          </button>
          <button className="switch-mode" onClick={resetMode}>
            Switch Mode
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          winner={winner}
          onClose={() => setShowModal(false)}
          onReset={resetGame}
          onSwitchMode={() => {
            resetMode();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Game;
