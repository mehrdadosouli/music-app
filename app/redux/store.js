import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./features/music/musicSlice";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
});