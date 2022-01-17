import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {compressTiles, coordinatesToHashmapKey} from "../../utilities/board";
import {Tile} from "../../types";
import {addBoardUpdates} from "../../store/reducers/gameReducer";

let clicks = 0;

const quickCreateTile = (params: { x: number, y: number, value?: number }): Tile => {
  const { x, y } = params;

  return {
    position: {
      x,
      y
    },
    bomb: false,
    bombOwn: false,
    value: params.value || null
  }
}

const renderGameTile = (y: number, x: number, board: Map<string, Tile>): JSX.Element => {
  const classNames = ["game-tile"];
  const key = coordinatesToHashmapKey({ y, x });
  const tile = board.get(key);

  if (tile) {
    if (tile.bomb) {
      if (tile.bombOwn) {
        classNames.push("game-tile--bomb-own");
      }
      else {
        classNames.push("game-tile--bomb-other");
      }
    }
    else {
      classNames.push("game-tile--open");
      if (tile.value !== null) {
        classNames.push(`game-tile--open-${tile.value}`);
      }
    }
  }
  else {
    classNames.push("game-tile--closed");
  }

  const dispatch = useAppDispatch();

  return (
    <div
      className={classNames.join(' ')}
      onClick={() => {
        if (clicks === 0) {
          dispatch(addBoardUpdates([
            quickCreateTile({ y: 0, x: 0}),
            quickCreateTile({ y: 0, x: 1}),
            quickCreateTile({ y: 0, x: 2}),
            quickCreateTile({ y: 0, x: 3, value: 1}),

            quickCreateTile({ y: 1, x: 0, value: 2}),
            quickCreateTile({ y: 1, x: 1, value: 2}),

            quickCreateTile({ y: 1, x: 2}),
            quickCreateTile({ y: 1, x: 3, value: 2}),

            quickCreateTile({ y: 2, x: 2, value: 2}),
            quickCreateTile({ y: 2, x: 3, value: 2}),
          ]))
        }

        clicks++;
      }}
    >
      {tile?.value ? tile.value : ""}
    </div>
  )
}

export const GamePage = () => {
  const { game: gameState } = useAppSelector(s => s);

  const { players, size, currentPlayer, board } = gameState;

  const boardTilesCompressed = compressTiles(board);

  return (
    <div>
      <h1>Minesweeper Multiplayer</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.nickname} {currentPlayer === index ? ' <- Current player' : ''}</li>
        ))}
      </ul>
      <br />
      <hr />
      <br />
      {new Array(size.height).fill(0).map((_, y) => {
        return (
          <>
            <div className="game-row">
              {
                new Array(size.width).fill(0).map((_2, x) =>
                  renderGameTile(y, x, boardTilesCompressed)
                )
              }
            </div>
          </>
        );
      })}
    </div>
  );
}
