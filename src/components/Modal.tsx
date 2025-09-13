import React from "react";

interface ModalProps {
  winner: string | null;
  isBoardFull: boolean;
  onClose: () => void;
  onReset: () => void;
  onSwitchMode: () => void;
}

const Modal: React.FC<ModalProps> = ({
  winner,
  isBoardFull,
  onClose,
  onReset,
  onSwitchMode,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>
          {winner ? `Congrats! Player ${winner} won!` : "Game Over: Draw!"}
        </h2>
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
