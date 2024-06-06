import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import navigationReducer from "./features/navigationSlice";
import popUpReducer from "./features/popUpMessagSlice";
import workspaceReducer from "./features/WorkspaceSlice";
import createComponentReducer from "./features/popUpCreateComponentSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  users: usersReducer,
  nav: navigationReducer,
  message: popUpReducer,
  workspace: workspaceReducer,
  create: createComponentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
