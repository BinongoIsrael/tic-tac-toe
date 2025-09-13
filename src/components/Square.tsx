// src/components/Square.tsx
import React from "react";
import { type SquareValue } from "../types";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick} disabled={!!value}>
      {value}
    </button>
  );
};

export default Square;
