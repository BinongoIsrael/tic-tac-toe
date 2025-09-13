import React from "react";
import Board from "./Board";
import { type BoardState } from "../types";

interface ModalProps {
  winner: string | null;
  board: BoardState;
  onClose: () => void;
  onReset: () => void;
  onSwitchMode: () => void;
}

const Modal: React.FC<ModalProps> = ({
  winner,
  board,
  onClose,
  onReset,
  onSwitchMode,
}) => {
  return (
    <div className="modal show">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>
          {winner ? `Congrats! Player ${winner} won!` : "Game Over: Draw!"}
        </h2>
        <div className="modal-board">
          <Board squares={board} onClick={() => {}} isMiniBoard={true} />
        </div>
        <div className="modal-buttons">
          <button className="reset-button" onClick={onReset}>
            Restart Game
          </button>
          <button className="switch-mode" onClick={onSwitchMode}>
            Switch Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
