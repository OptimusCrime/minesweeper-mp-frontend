import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./reducers/globalReducer";
import gameReducer from "./reducers/gameReducer";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
