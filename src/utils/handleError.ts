import {setAppErrorAC, setAppStatusAC} from "../app/reducers/appReducer";
import {AppThunkDispatch} from "../app/store";
import {AxiosError} from "axios";

export const handleServerError = (dispatch: AppThunkDispatch, error: string ) => {
  dispatch(setAppStatusAC('failed'))
  dispatch(setAppErrorAC(error))
  console.warn(error)
}

export const handleNetworkError = (dispatch: AppThunkDispatch, error: AxiosError ) => {
  dispatch(setAppStatusAC('failed'))
  dispatch(setAppErrorAC(error.message))
  console.warn(error.message)
}