import {AppThunkDispatch} from "../app/store";
import {AxiosError} from "axios";

export const handleServerError = (dispatch: AppThunkDispatch, error: string ) => {
  console.warn(error)
}

export const handleNetworkError = (dispatch: AppThunkDispatch, error: AxiosError ) => {
  console.warn(error.message)
}