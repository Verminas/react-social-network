import { AnyAction } from "redux";
import { usersSlice } from "features/SocialNetwork/model/usersSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { currentUserSlice } from "features/SocialNetwork/model/currentUserSlice";
import { appSlice } from "app/appSlice";
import { userStatusReducer } from "features/SocialNetwork/model/userStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "features/Auth/model/authSlice";
import { dialogsReducer } from "features/SocialNetwork/model/dialogsSlice";
import { messagesReducer } from "features/SocialNetwork/model/messagesSlice";
import { newsReducer } from "../features/SocialNetwork/model/newsSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    currentUser: currentUserSlice,
    app: appSlice,
    auth: authSlice,
    userStatus: userStatusReducer,
    dialogs: dialogsReducer,
    messages: messagesReducer,
    news: newsReducer
  },
});

export type AppRootType = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<AppRootType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// export const store = legacy_createStore(rootReducer, {},applyMiddleware(thunk));

// @ts-ignore
window.store = store;
