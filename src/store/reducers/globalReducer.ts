import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum State {
  WELCOME_PAGE,
  LOBBY,
  GAME,
  GAME_FINISHED,
}

interface GlobalState {
  state: State;
  nickname: string;
  roomCode: string;
}

const initialState: GlobalState = {
  state: State.WELCOME_PAGE,
  nickname: "",
  roomCode: "",
};

const globalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<State>) {
      state.state = action.payload;
    },
    setPlayerInformation(
      state,
      action: PayloadAction<{ nickname: string; roomCode: string }>
    ) {
      state.nickname = action.payload.nickname || "Anon";
      state.roomCode = action.payload.roomCode || "ACT55";
    },
  },
});

export const { setState, setPlayerInformation } = globalReducer.actions;
export default globalReducer.reducer;
