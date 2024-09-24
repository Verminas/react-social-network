import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {messagesReducer} from "./reducers/messagesReducer";
import {postsReducer} from "./reducers/postsReducer";
import {usersSlice} from "./reducers/usersSlice";
import { ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {currentUserSlice} from "./reducers/currentUserSlice";
import {appSlice} from "./reducers/appSlice";
import {userStatusReducer} from "./reducers/userStatusSlice";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./reducers/authSlice";

const rootReducer = combineReducers({
  // messages: messagesReducer,
  // posts: postsReducer,
  users: usersSlice,
  currentUser: currentUserSlice,
  app: appSlice,
  auth: authSlice,
  userStatus: userStatusReducer,
})



export type AppRootType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// export const store = legacy_createStore(rootReducer, {},applyMiddleware(thunk));

export const store = configureStore({
  reducer: rootReducer
})
// @ts-ignore
window.store = store;