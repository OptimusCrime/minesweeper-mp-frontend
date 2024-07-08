export enum OutboundMessageType {
  JOIN_LOBBY = "JOIN_LOBBY"
}
export interface JoinLobbyOutboundMessage {
  type: OutboundMessageType.JOIN_LOBBY;
  nickname: string;
  roomCode: string;
}

export type OutboundMessages = JoinLobbyOutboundMessage;
