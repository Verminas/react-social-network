import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {messagesReducer} from "./reducers/messagesReducer";
import {postsReducer} from "./reducers/postsReducer";
import {usersReducer} from "./reducers/usersReducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {currentUserReducer} from "./reducers/currentUserReducer";
import {appReducer} from "./reducers/appReducer";
import {userStatusReducer} from "./reducers/userStatus";

const rootReducer = combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
  users: usersReducer,
  currentUser: currentUserReducer,
  app: appReducer,
  userStatus: userStatusReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const store = legacy_createStore(rootReducer, {},applyMiddleware(thunk));
// @ts-ignore
window.store = store;