import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";

import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import {
  authSlicePersistConfig,
  profileSlicePersistConfig,
} from "../store/persistConfig";

const userId = localStorage.getItem("userId") || "default";

const rootReducer = combineReducers({
  auth: persistReducer(authSlicePersistConfig(userId), authReducer),
  profile: persistReducer(profileSlicePersistConfig(userId), profileReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
