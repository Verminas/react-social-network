import {socialAPI, UserType} from "../api/socialAPI";
import {Dispatch} from "redux";

const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SHOW_MORE_USERS = 'SHOW_MORE_USERS'
const SEARCH_USERS = 'SEARCH_USERS'

type ShowMoreUsersActionType = ReturnType<typeof showMoreUsersAC>
type FollowUnfollowUserActionType = ReturnType<typeof followUserAC>
type UnfollowUnfollowUserActionType = ReturnType<typeof unfollowUserAC>
type SearchUsersActionType = ReturnType<typeof searchUsersAC>

const initialState: UserType[]  = []


type UsersReducerActionTypes = ShowMoreUsersActionType | FollowUnfollowUserActionType | SearchUsersActionType | UnfollowUnfollowUserActionType

export const usersReducer = (state: UserType[] = initialState, action: UsersReducerActionTypes): UserType[] => {
  switch (action.type) {

    case SHOW_MORE_USERS: {
      const {users} = action.payload;
      const newUsers: UserType[] = users.map(user => ({...user}));
      return [...state, ...newUsers];
    }
    case FOLLOW_USER: {
      const {userId} = action.payload;
      return state.map(u => u.id === userId ? {...u, followed: true} : u);
    }

    case UNFOLLOW_USER: {
      const {userId} = action.payload;
      return state.map(u => u.id === userId ? {...u, followed: false} : u);
    }

    case SEARCH_USERS: {
      const {users} = action.payload;
      return users;

    }

    default: return state;
  }
}


export const showMoreUsersAC = (users: UserType[]) => ({
  type: SHOW_MORE_USERS,
  payload: {
    users
  }
}) as const

export const showMoreUsersTC = (page: number) => {
  return (dispatch: Dispatch) => {
    socialAPI.getUsers(page)
      .then(data => data.items)
      .then(users => dispatch(showMoreUsersAC(users)))
  }
}

const followUserAC = (userId: number) => ({
  type: FOLLOW_USER,
  payload: {
    userId,
  }
}) as const

export const followUserTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    socialAPI.followUser(userId)
      .then(data => dispatch(followUserAC(userId)))
  }
}

const unfollowUserAC = (userId: number) => ({
  type: UNFOLLOW_USER,
  payload: {
    userId,
  }
}) as const

export const unfollowUserTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    socialAPI.unfollowUser(userId)
      .then(data => dispatch(unfollowUserAC(userId)))
  }
}

const searchUsersAC = (users: UserType[]) => ({
  type: SEARCH_USERS,
  payload: {
    users
  }
}) as const

export const searchUsersTC = (title: string) => {
  return (dispatch: Dispatch) => {
    socialAPI.searchUsers(title)
      .then(data => data.items)
      .then(items => dispatch(searchUsersAC(items)))
  }
}