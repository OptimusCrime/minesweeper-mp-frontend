import {IncomingMessageType, JoinLobbyFailedIncomingMessage, JoinLobbySuccessIncomingMessage} from "./incomingTypes";

export const isJoinLobbyFailedIncomingMessage = (obj: any): obj is JoinLobbyFailedIncomingMessage =>
  obj?.type === IncomingMessageType.JOIN_LOBBY_FAILED;

export const isJoinLobbySuccessIncomingMessage = (obj: any): obj is JoinLobbySuccessIncomingMessage =>
  obj?.type === IncomingMessageType.JOIN_LOBBY_SUCCESS;
