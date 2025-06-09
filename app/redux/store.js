import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/music/musicSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice, // نام کلید دلخواه: reducer اصلی
  },
});