export type SquareValue = 'X' | 'O' | null;
export type BoardState = SquareValue[];
export type GameMode = 'pvp' | 'pvc'

export interface BoardProps {
  squares: BoardState;
  onClick: (i: number) => void;
  isMiniBoard?: boolean;
}

