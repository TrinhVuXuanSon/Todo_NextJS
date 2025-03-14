import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import todoReducer from "./todoSlice";
import persistedReducer from "./persistedAuthSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
