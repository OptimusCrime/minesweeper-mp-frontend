import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, Tile } from "../../types";
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
  players: [
    {
      nickname: "Player 1",
      points: 0,
      hasWon: false,
    },
    {
      nickname: "Player 2",
      points: 0,
      hasWon: false,
    },
  ],
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
    addCurrentPlayer(state, action: PayloadAction<{ nickname: string }>) {
      state.players.push({
        nickname: action.payload.nickname || "Anon",
        points: 0,
        hasWon: false,
      });
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
