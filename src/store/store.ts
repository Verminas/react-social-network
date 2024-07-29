import {combineReducers, legacy_createStore} from "redux";
import {messagesReducer} from "../reducers/messagesReducer";
import {postsReducer} from "../reducers/postsReducer";
import {usersReducer} from "../reducers/usersReducer";

const rootReducer = combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
  users: usersReducer
})

export type AppRootType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer)
// @ts-ignore
window.store = store;