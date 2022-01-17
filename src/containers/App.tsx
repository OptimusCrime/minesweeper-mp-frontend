import React from 'react';
import {useAppSelector} from "../store/hooks";
import {State} from "../store/reducers/globalReducer";
import {WelcomePage, LobbyPage, GamePage} from "../pages";

export const App = () => {
  const { state } = useAppSelector(s => s.global);

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
