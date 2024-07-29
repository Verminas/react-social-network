import {combineReducers, legacy_createStore} from "redux";
import {messagesReducer} from "../reducers/messagesReducer";
import {postsReducer} from "../reducers/postsReducer";

const rootReducer = combineReducers({
  messages: messagesReducer,
  posts: postsReducer,
})

export type AppRootType = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer)