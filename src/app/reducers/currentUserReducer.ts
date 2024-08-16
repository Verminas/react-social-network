import {GetUserProfileResponseType, socialAPI} from "../../api/socialAPI";
import {AppThunkDispatch} from "../store";
import {setAppStatusAC} from "./appReducer";
import {handleNetworkError} from "../../utils/handleError";

const GET_USER_PROFILE = "GET_USER_PROFILE";

const initialState: GetUserProfileResponseType = {} as GetUserProfileResponseType;
type ActionsType = GetUserProfileActionType

export const currentUserReducer = (state: GetUserProfileResponseType = initialState, action: ActionsType): GetUserProfileResponseType => {
  switch (action.type) {
    case "GET_USER_PROFILE": {
      const {user} = action.payload;
      return user
    }

    default:
      return state;
  }
}

type GetUserProfileActionType = ReturnType<typeof getUserProfileAC>

export const getUserProfileAC = (user: GetUserProfileResponseType) => ({
  type: GET_USER_PROFILE,
  payload: {
    user
  }
})

export const getCurrentUserProfileTC = (userId: number) => {
  return (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    socialAPI.getUserProfile(userId)
      .then(user => {
        dispatch(getUserProfileAC(user))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(err => {
        handleNetworkError(dispatch, err)
      })
  }
}

