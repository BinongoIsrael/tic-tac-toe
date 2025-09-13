import { type BoardState } from '../types';
import { calculateWinner } from './calculateWinner';

interface Move {
  index: number;
  score: number;
}

export function findBestMove(board: BoardState): number {
  let bestMove: Move = { index: -1, score: -Infinity };

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null; 

      if (score > bestMove.score) {
        bestMove = { index: i, score };
      }
    }
  }

  return bestMove.index;
}

function minimax(board: BoardState, depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board);
  if (winner === 'O') return 10 - depth; 
  if (winner === 'X') return depth - 10; 
  if (board.every((square) => square !== null)) return 0; 

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}