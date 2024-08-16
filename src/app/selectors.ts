import {AppRootType} from "./store";

export const selectMessages = (state: AppRootType) => state.messages

export const selectCurrentUser = (state: AppRootType) => state.currentUser

export const selectUsers = (state: AppRootType) => state.users

export const selectUserStatus = (state: AppRootType) => state.userStatus

export const selectAppState = (state: AppRootType) => state.app