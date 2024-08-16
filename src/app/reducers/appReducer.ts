import {AppRootType, AppThunkDispatch} from "../store";
import {socialAPI} from "../../api/socialAPI";
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
    case APP_SET_STATUS: {
      const {status} = action.payload;
      console.log(status)
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
  | SetAppStatusActionType
  | SetAppErrorActionType


type IsAuthorizesAppActionType = ReturnType<typeof isAuthorizedAppAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const isAuthorizedAppAC = (isAuthorized: boolean) => ({
  type: APP_IS_AUTH_USER,
  payload: {
    isAuthorized
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
    socialAPI.authMe()
      .then(res => {
        if (res.resultCode === 0) {
          dispatch(isAuthorizedAppAC(true))
          dispatch(setAppStatusAC('succeeded'))
          dispatch(getCurrentUserProfileTC(res.data.id))
        } else {
          handleServerError(dispatch, res.messages[0])
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}