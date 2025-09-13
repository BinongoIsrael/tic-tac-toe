# Tic-Tac-Toe

This is an enhanced Tic-Tac-Toe game built with **React** and **TypeScript**, extending the [React Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) to include advanced features like PvP/PvC modes, an intelligent AI with adjustable difficulty, an animated modal for game results, and a detailed move history with coordinates. The application features a modern, responsive design with a teal gradient background, green 'X' and red 'O' markers, and smooth animations.

## Features

- **Mode Selection (PvP and PvC)**:
  - Choose between **Player vs. Player (PvP)** and **Player vs. Computer (PvC)** modes via a mode selector.
  - PvP supports two human players; PvC pits a human against an AI opponent.

- **Intelligent AI with Adjustable Difficulty**:
  - In PvC mode, the AI uses the **minimax algorithm** for optimal moves or random moves for variability.
  - A **difficulty slider** adjusts the minimax probability (0% to 100%), defaulting to 50%.

- **Modal for Game Results**:
  - Displays "Congrats! Player X won!" or "Game Over: Draw!" with fade-in/scale animations.
  - Includes a **read-only mini board** showing the final state, with no hover effects on squares.
  - Features **Close**, **Restart Game**, and **Switch Mode** buttons with hover/click animations.

- **Game Status Display**:
  - Shows "Next player: X", "Next player: O", "Winner: X", or "Draw" above the board.

- **Move History**:
  - Lists moves with coordinates (e.g., "Move #1: X at (1,1)") and a scrollbar.
  - Highlights the current move with a light blue background and bold text.
  - Includes **Restart Game** and **Switch Mode** buttons below the history.

- **Styling and Animations**:
  - Green 'X' (`#10b981`) and red 'O' (`#ef4444`) for visual clarity.
  - Responsive design with stacked layout and smaller squares on mobile.
  - Smooth animations for modal transitions and button interactions.

## Project Structure

```
src/
├── components/
│   ├── Board.tsx          # Renders the 3x3 game board (supports mini board)
│   ├── Game.tsx          # Manages game logic, state, AI, and difficulty slider
│   ├── Modal.tsx         # Displays win/draw results with mini board
│   ├── ModeSelector.tsx  # Handles PvP/PvC mode selection
│   ├── Square.tsx        # Renders individual board squares
├── utils/
│   ├── calculateWinner.ts # Determines the winner or draw
│   ├── minimax.ts        # Implements minimax algorithm for AI
├── types.ts              # TypeScript interfaces
├── App.tsx               # Main app component
├── App.css               # Component-specific styles
├── index.css             # Global styles
├── main.tsx              # Entry point
├── vite-env.d.ts         # Vite TypeScript definitions
```

## Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:BinongoIsrael/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install Dependencies**:
   Ensure [Node.js](https://nodejs.org/) is installed, then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser (as of 04:17 AM PST, September 14, 2025).

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Tutorial: Building Tic-Tac-Toe

This project is built by extending the [React Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe), designed for learning React by doing. Below is a guide to building the core game, with additional notes on how this project enhances it.

### Setup for the Tutorial

To follow the tutorial, use [CodeSandbox](https://codesandbox.io/) by forking the starter code or set up locally:

1. **Install Node.js** (if using locally).
2. Download the starter code from CodeSandbox or clone this repository.
3. If local, unzip the archive, `cd` to the directory, and run:
   ```bash
   npm install
   npm start
   ```
4. Follow the prompts to view the app in your browser.

### Overview

Now that you’re set up, let’s get an overview of React! This tutorial, sourced from the [React Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe), guides you through building a basic Tic-Tac-Toe game while learning React concepts like components, props, state, and immutability. This project extends the tutorial with TypeScript, PvP/PvC modes, an AI with adjustable difficulty, a modal for results, and enhanced styling.

#### Inspecting the Starter Code

In CodeSandbox, you’ll see:
- **Files**: `App.js`, `index.js`, `styles.css`, and a `public` folder.
- **Code Editor**: Shows the source code of the selected file.
- **Browser**: Displays the rendered app.

The starter `App.js` defines a `Square` component:
```jsx
export default function Square() {
  return <button className="square">X</button>;
}
```

This renders a single square with an 'X'. The `styles.css` file styles the `.square` class, and `index.js` connects the app to the browser.

### Building the Board

Update `App.js` to create a `Board` component with nine squares in a 3x3 grid:
```jsx
export default function Board() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```

Use `styles.css` to style `.board-row` for a grid layout.

### Passing Data Through Props

Create a reusable `Square` component:
```jsx
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```

### Making an Interactive Component

Add state to `Square` to update its value on click:
```jsx
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue('X');
  }
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
```

### Lifting State Up

Move state to `Board` to manage all squares:
```jsx
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
```

### Taking Turns

Add `xIsNext` state to alternate between 'X' and 'O':
```jsx
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  // ...
}
```

### Declaring a Winner

Add `calculateWinner` to check for a winner:
```jsx
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Update `Board` to display the winner:
```jsx
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  return (
    <>
      <div className="status">{status}</div>
      {/* Board rows */}
    </>
  );
}
```

### Adding Time Travel

Lift state to a `Game` component to store move history:
```jsx
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
```

### Enhancements in This Project

This project extends the tutorial with:
- **TypeScript**: Uses `types.ts` for type safety (e.g., `SquareValue`, `BoardState`).
- **PvP/PvC Modes**: `ModeSelector.tsx` allows mode switching.
- **AI**: `minimax.ts` implements an unbeatable AI with a difficulty slider in `Game.tsx`.
- **Modal**: `Modal.tsx` shows game results with a read-only mini board (fixed to remove hover effects on null squares).
- **Move Coordinates**: History displays moves as (row, col).
- **Styling**: Green 'X', red 'O', animations, and responsive design in `App.css`.

### Usage

- **Select Mode**: Choose PvP or PvC.
- **Adjust AI Difficulty**: In PvC, use the slider to set minimax probability.
- **Play**: Alternate 'X' and 'O' in PvP; human ('X') vs. AI ('O') in PvC.
- **View History**: Jump to past moves with coordinates.
- **Game End**: Modal shows the final board and options to close, restart, or switch modes.

## Development Notes

- **Tech Stack**: React, TypeScript (`verbatimModuleSyntax`), Vite, CSS.
- **Fixes**: Removed hover effects on modal’s mini board squares (`Square.tsx`, `Board.tsx`, `App.css`).
- **Responsive Design**: Mobile-friendly layout with smaller squares (70px main, 50px mini).

## Potential Enhancements

- Highlight winning line on the mini board.
- Add “Final Board” caption to the modal.
- Show minimax/random move type in PvC history.
- Implement sound effects or a score tracker.

## Credits

Built upon the [React Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) with custom enhancements.