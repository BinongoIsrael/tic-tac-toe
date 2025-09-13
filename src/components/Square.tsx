import React from "react";
import { type SquareValue } from "../types";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  disabled?: boolean;
}

const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  disabled = false,
}) => {
  return (
    <div className="square-container">
      <button
        className={`square ${value ? value.toLowerCase() : ""}`}
        onClick={onClick}
        disabled={disabled || !!value}
      >
        {value}
      </button>
    </div>
  );
};

export default Square;
