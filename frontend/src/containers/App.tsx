import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {State} from "../store/reducers/globalReducer";
import {WelcomePage, LobbyPage, GamePage} from "../pages";
import {initWebsocket} from "../websocket/websocket";

export const App = () => {
  const { state } = useAppSelector(s => s.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window["WebSocket"]) {
      initWebsocket(dispatch);
    }
    else {
      // TODO error message here
    }
  });

    const renderMainContent = (currentState: State) => {
    switch (currentState) {
      case State.GAME:
        return <GamePage />;
      case State.GAME_FINISHED:
        return (
          <p>Game finished</p>
        );
      case State.LOBBY:
        return <LobbyPage />;
      case State.WELCOME_PAGE:
      default:
        return <WelcomePage />;
    }
  }

  return (
    <div>
      {renderMainContent(state)}
    </div>
  );
}
