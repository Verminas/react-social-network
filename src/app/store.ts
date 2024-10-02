import { AnyAction } from "redux";
import { usersSlice } from "./reducers/usersSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { currentUserSlice } from "./reducers/currentUserSlice";
import { appSlice } from "./reducers/appSlice";
import { userStatusReducer } from "./reducers/userStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { dialogsReducer } from "app/reducers/dialogsSlice";
import { messagesReducer } from "app/reducers/messagesSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    currentUser: currentUserSlice,
    app: appSlice,
    auth: authSlice,
    userStatus: userStatusReducer,
    dialogs: dialogsReducer,
    messages: messagesReducer,
  },
});

export type AppRootType = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<AppRootType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// export const store = legacy_createStore(rootReducer, {},applyMiddleware(thunk));

// @ts-ignore
window.store = store;
