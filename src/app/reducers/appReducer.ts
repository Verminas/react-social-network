import {AppRootType, AppThunkDispatch} from "../store";
import {authAPI, socialAPI, UserLogInRequestType} from "../../api/socialAPI";
import {getUserProfileAC, getCurrentUserProfileTC} from "./currentUserReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleError";

type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const APP_IS_AUTH_USER = 'APP_IS_AUTH_USER'
const APP_IS_LOGGED_IN = 'APP_IS_LOGGED_IN'
const APP_SET_STATUS = 'APP_SET_STATUS'
const APP_SET_ERROR = 'APP_SET_ERROR'

const initialState = {
  status: 'idle',
  error: null,
  isAuthorized: false,
  isLoggedIn: false,
} as AppStateType;

type AppStateType = {
  status: AppStatusType
  error: null | string
  isAuthorized: boolean
  isLoggedIn: boolean
}

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case APP_IS_AUTH_USER: {
      const {isAuthorized} = action.payload;
      return {...state, isAuthorized}
    }
    case APP_IS_LOGGED_IN: {
      const {isLoggedIn} = action.payload;
      return {...state, isLoggedIn}
    }
    case APP_SET_STATUS: {
      const {status} = action.payload;
      return {...state, status}
    }
    case APP_SET_ERROR: {
      const {error} = action.payload;
      return {...state, error}
    }
    default:
      return state;
  }
}

type ActionsType =
  | IsAuthorizesAppActionType
  | IsLoggedInAppActionType
  | SetAppStatusActionType
  | SetAppErrorActionType


type IsAuthorizesAppActionType = ReturnType<typeof isAuthorizedAppAC>
type IsLoggedInAppActionType = ReturnType<typeof isLoggedInAppAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const isAuthorizedAppAC = (isAuthorized: boolean) => ({
  type: APP_IS_AUTH_USER,
  payload: {
    isAuthorized
  }
}) as const

export const isLoggedInAppAC = (isLoggedIn: boolean) => ({
  type: APP_IS_LOGGED_IN,
  payload: {
    isLoggedIn
  }
}) as const

export const setAppStatusAC = (status: AppStatusType) => ({
  type: APP_SET_STATUS,
  payload: {
    status
  }
}) as const

export const setAppErrorAC = (error: string | null) => ({
  type: APP_SET_ERROR,
  payload: {
    error
  }
}) as const

export const isAuthorizedAppTC = () => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
      .then(res => {
        if (res.resultCode === 0) {
          dispatch(isLoggedInAppAC(true))
          dispatch(setAppStatusAC('succeeded'))
           dispatch(getCurrentUserProfileTC(res.data.id))
        } else {
          handleServerError(dispatch, res.messages[0])
        }

        dispatch(isAuthorizedAppAC(true))
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}

export const isLoggedInTC = (data: UserLogInRequestType) => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logIn(data).then(res => {
      debugger
      if (res.resultCode === 0) {
        dispatch(isLoggedInAppAC(true))
        dispatch(getCurrentUserProfileTC(res.data.userId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerError(dispatch, res.messages[0])
      }
    })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}