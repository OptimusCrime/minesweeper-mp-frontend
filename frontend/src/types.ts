export interface Player {
  nickname: string;
  currentPlayer: boolean;
  currentTurn: boolean;
}

export interface Tile {
  position: {
    y: number;
    x: number;
  };
  value: number | null;
  bomb: boolean;
  bombOwn: boolean;
}
