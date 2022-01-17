import { Tile } from "../types";

export const coordinatesToHashmapKey = (params: {
  y: number;
  x: number;
}): string => {
  const { y, x } = params;
  return `${y}-${x}`;
};

const tilePositionToHashmapKey = (tile: Tile): string =>
  coordinatesToHashmapKey({
    y: tile.position.y,
    x: tile.position.x,
  });

export const compressTiles = (tiles: Tile[]): Map<string, Tile> => {
  const map = new Map<string, Tile>();

  for (const tile of tiles) {
    map.set(tilePositionToHashmapKey(tile), tile);
  }

  return map;
};
