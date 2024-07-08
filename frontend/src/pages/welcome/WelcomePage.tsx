import React, {useState} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {broadcastMessage} from "../../websocket/websocket";
import {OutboundMessageType} from "../../websocket/outboundTypes";

export const WelcomePage = () => {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

  return (
    <div>
      <h1>Welcome to Minesweeper Multiplayer</h1>
      <label htmlFor="nickname">Nickname:</label>
      <input
        id="nickname"
        type="text"
        onChange={e => setNickname(e.target.value)}
        placeholder="Nickname"
      />
      <br />
      <label htmlFor="roomCode">Room (leave blank to create a new room):</label>
      <input
        id="roomCode"
        type="text"
        onChange={e => setRoomCode(e.target.value)}
        placeholder="ATL55"
      />
      <br />
      <br />
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();

          broadcastMessage({
            type: OutboundMessageType.JOIN_LOBBY,
            nickname: nickname,
            roomCode: roomCode,
          });
        }}
      >Go!</button>
    </div>
  );
}
