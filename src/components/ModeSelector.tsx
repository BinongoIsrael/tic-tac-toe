import React from "react";
import { type GameMode } from "../types";

interface ModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="mode-selector">
      <h2>Choose Game Mode</h2>
      <button onClick={() => onSelectMode("pvp")}>Player vs Player</button>
      <button onClick={() => onSelectMode("pvc")}>Player vs Computer</button>
    </div>
  );
};

export default ModeSelector;
