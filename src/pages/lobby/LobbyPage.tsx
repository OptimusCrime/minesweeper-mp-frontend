import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setState, State} from "../../store/reducers/globalReducer";
import {randomizePlayers} from "../../store/reducers/gameReducer";

export const LobbyPage = () => {
  const { global: globalState, game: gameState } = useAppSelector(s => s);
  const dispatch = useAppDispatch();

  const { nickname, roomCode } = globalState;
  const { players } = gameState;

  return (
    <div>
      <h1>Minesweeper Multiplayer</h1>
      <p>Hello, {nickname}</p>
      <p>Lobby: {roomCode}</p>
      <p>Players in lobby:</p>
      <ul>
        {players.map(player => (
          <li>{player.nickname}</li>
        ))}
      </ul>
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();

          dispatch(randomizePlayers())

          dispatch(setState(State.GAME));
        }}
      >
        Start game
      </button>
    </div>
  );
}
