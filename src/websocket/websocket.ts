import {OutboundMessages} from "./outboundTypes";
import {useAppDispatch} from "../store/hooks";
import {isJoinLobbyFailedIncomingMessage, isJoinLobbySuccessIncomingMessage} from "./identity";
import {setPlayerInformation, setState, State} from "../store/reducers/globalReducer";
import {addCurrentPlayer} from "../store/reducers/gameReducer";

let conn: WebSocket;

export const initWebsocket = (dispatch: any) => {
  conn = new WebSocket("ws://localhost:8094/ws");
  conn.onclose = function (_) {
    setTimeout(function () {
      location.reload();
    }, 2000);
  };
  conn.onmessage = function (evt) {
    const messages = evt.data.split('\n');
    for (const message of messages) {
      const jsonObject = JSON.parse(message);

      if (isJoinLobbyFailedIncomingMessage(jsonObject)) {
        console.error("Failed to join room!");
        console.log(jsonObject);
      }
      else if (isJoinLobbySuccessIncomingMessage(jsonObject)) {
        dispatch(setPlayerInformation({
          nickname: jsonObject.nickname,
          roomCode: jsonObject.roomCode
        }));

        dispatch(addCurrentPlayer({ players: jsonObject.players} ))

        dispatch(setState(State.LOBBY));
      }
    }
  };
}

export const broadcastMessage = (message: OutboundMessages) => {
  if (conn) {
    conn.send(JSON.stringify(message));
  }
  else {
    console.log('No active connection :(');
  }
};
