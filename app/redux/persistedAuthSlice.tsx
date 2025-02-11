import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

export default persistReducer(authPersistConfig, authReducer);
