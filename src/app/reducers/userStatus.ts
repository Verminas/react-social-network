import {Dispatch} from "redux";
import {AppThunkDispatch} from "../store";
import {socialAPI} from "../../api/socialAPI";
import {setAppStatusAC} from "./appReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleError";

const GET_USER_STATUS = 'GET_USER_STATUS'

const initialState = {
  status: null
} as const

type UserStatusStateType = {
  status: null | string
}

export const userStatusReducer = (state: UserStatusStateType = initialState, action: ActionsType): UserStatusStateType => {
  switch (action.type) {
    case GET_USER_STATUS: {
      const {status} = action.payload
      return {...state, status}
    }
    default:
      return state;
  }
}

type ActionsType = GetUserStatusActionType

type GetUserStatusActionType = ReturnType<typeof getUserStatusAC>


// action creators
const getUserStatusAC = (status: null | string) => ({
  type: GET_USER_STATUS,
  payload: {
    status
  }
})

// think creators

export const getUserStatusTC = (userId: number) => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.getUserStatus(userId)
      .then(res => {
        dispatch(getUserStatusAC(res))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}

export const updateUserStatusTC = (userId: number, title: string) => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"))
    socialAPI.updateUserStatus(title)
      .then(res => {
        if (res.resultCode === 0) {
          dispatch(getUserStatusTC(userId))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerError(dispatch, res.messages[0])
        }
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}
