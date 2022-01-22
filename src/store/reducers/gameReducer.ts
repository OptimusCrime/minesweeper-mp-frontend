import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Player, Tile} from "../../types";
import { shuffleArray } from "../../utilities/randomizeArray";

interface GlobalState {
  players: Player[];
  size: {
    width: number;
    height: number;
    bombs: number;
  };
  board: Tile[];
  bombsFound: number;
  currentPlayer: number;
}

const initialState: GlobalState = {
  players: [],
  size: {
    width: 16,
    height: 16,
    bombs: 40,
  },
  board: [],
  bombsFound: 0,
  currentPlayer: 0,
};

const gameReducer = createSlice({
  name: "game",
  initialState,
  reducers: {
    addCurrentPlayer(state, action: PayloadAction<{ players: Player[] }>) {
      state.players = action.payload.players;
    },
    randomizePlayers(state) {
      state.players = shuffleArray(state.players);
    },
    addBoardUpdates(state, action: PayloadAction<Tile[]>) {
      state.board.push(...action.payload);
    },
  },
});

export const { addCurrentPlayer, randomizePlayers, addBoardUpdates } =
  gameReducer.actions;
export default gameReducer.reducer;
