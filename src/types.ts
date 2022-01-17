export interface Player {
  nickname: string;
  points: number;
  hasWon: boolean;
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
