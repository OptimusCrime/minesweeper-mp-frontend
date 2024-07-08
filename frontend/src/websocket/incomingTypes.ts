import {Player} from "../types";

export enum IncomingMessageType {
  JOIN_LOBBY_FAILED = "JOIN_LOBBY_FAILED",
  JOIN_LOBBY_SUCCESS = "JOIN_LOBBY_SUCCESS"
}
export interface JoinLobbyFailedIncomingMessage {
  type: IncomingMessageType.JOIN_LOBBY_FAILED;
  roomCode: string;
}

export interface JoinLobbySuccessIncomingMessage {
  type: IncomingMessageType.JOIN_LOBBY_SUCCESS;
  nickname: string;
  roomCode: string;
  players: Player[];
}
