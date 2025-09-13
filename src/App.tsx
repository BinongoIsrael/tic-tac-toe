import React, { useState } from "react";
import Game from "./components/Game";
import ModeSelector from "./components/ModeSelector";
import { type GameMode } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode | null>(null);

  const resetMode = () => setMode(null);

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      {mode ? (
        <>
          <Game mode={mode} />
          <button className="switch-mode" onClick={resetMode}>
            Switch Mode
          </button>
        </>
      ) : (
        <ModeSelector onSelectMode={setMode} />
      )}
    </div>
  );
};

export default App;
