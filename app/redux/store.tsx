import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

// Không sử dụng localStorage hay middleware
// State sẽ reset mỗi khi refresh trang
export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
