import {UserType} from "../api/socialAPI";

const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SHOW_MORE_USERS = 'SHOW_MORE_USERS'
const SEARCH_USERS = 'SEARCH_USERS'

export const showMoreUsersAC = (users: UserType[]) => ({
  type: SHOW_MORE_USERS,
  payload: {
    users
  }
}) as const

export const followUserAC = (userId: number) => ({
  type: FOLLOW_USER,
  payload: {
    userId,
  }
}) as const

export const unfollowUserAC = (userId: number) => ({
  type: UNFOLLOW_USER,
  payload: {
    userId,
  }
}) as const

export const searchUsersAC = (users: UserType[]) => ({
  type: SEARCH_USERS,
  payload: {
    users
  }
}) as const

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