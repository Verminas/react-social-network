import {socialAPI, UserType} from "../../api/socialAPI";
import {Dispatch} from "redux";
import {AppThunkDispatch} from "../store";
import {setAppStatusAC} from "./appReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleError";
import {getUserProfileAC} from "./currentUserReducer";
import {AxiosError} from "axios";

const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SHOW_MORE_USERS = 'SHOW_MORE_USERS'
const SEARCH_USERS = 'SEARCH_USERS'
const FETCH_USERS = 'FETCH_USERS'

type ShowMoreUsersActionType = ReturnType<typeof showMoreUsersAC>
type FollowUnfollowUserActionType = ReturnType<typeof followUserAC>
type UnfollowUnfollowUserActionType = ReturnType<typeof unfollowUserAC>
type SearchUsersActionType = ReturnType<typeof searchUsersAC>
type FetchUsersActionType = ReturnType<typeof fetchUsersAC>

const initialState: UserType[] = []


type UsersReducerActionTypes =
  | ShowMoreUsersActionType
  | FollowUnfollowUserActionType
  | SearchUsersActionType
  | UnfollowUnfollowUserActionType
  | FetchUsersActionType

export const usersReducer = (state: UserType[] = initialState, action: UsersReducerActionTypes): UserType[] => {
  switch (action.type) {

    case FETCH_USERS: {
      const {users} = action.payload;
      return [...users];
    }
    case SHOW_MORE_USERS: {
      const {users} = action.payload;
      return [...state, ...users];
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

    default:
      return state;
  }
}


// action creators

export const fetchUsersAC = (users: UserType[]) => ({
  type: FETCH_USERS,
  payload: {
    users
  }
}) as const
export const showMoreUsersAC = (users: UserType[]) => ({
  type: SHOW_MORE_USERS,
  payload: {
    users
  }
}) as const
const followUserAC = (userId: number) => ({
  type: FOLLOW_USER,
  payload: {
    userId,
  }
}) as const
const unfollowUserAC = (userId: number) => ({
  type: UNFOLLOW_USER,
  payload: {
    userId,
  }
}) as const
const searchUsersAC = (users: UserType[]) => ({
  type: SEARCH_USERS,
  payload: {
    users
  }
}) as const

// thunk creators

export const fetchUsersTC = (page: number = 1) => {
  return async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
      const res = await socialAPI.getUsers(page)
      if(!res.error) {
        dispatch(fetchUsersAC(res.items))
        dispatch(setAppStatusAC("succeeded"))
        return res.totalCount
      } else {
        handleServerError(dispatch, res.error)
      }
    } catch (err) {
      handleNetworkError(dispatch, err as AxiosError)
    }
  }
}
export const showMoreUsersTC = (page: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.getUsers(page)
      .then(res => {
        if (!res.error) {
          dispatch(showMoreUsersAC(res.items))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerError(dispatch, res.error)
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}
export const followUserTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.followUser(userId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(followUserAC(userId))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerError(dispatch, res.data.messages[0])
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}
export const unfollowUserTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.unfollowUser(userId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(unfollowUserAC(userId))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerError(dispatch, res.data.messages[0])
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}
export const searchUsersTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.searchUsers(title)
      .then(res => {
        if (!res.error) {
          dispatch(searchUsersAC(res.items))
        } else {
          handleServerError(dispatch, res.error)
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}
export const getUserProfileTC = (userId: number) => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    return socialAPI.getUserProfile(userId)
      .then(user => {
        dispatch(setAppStatusAC('succeeded'))
        return user;
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}