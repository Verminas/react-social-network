import {GetUserProfileResponseType} from "../api/socialAPI";

const GET_USER_PROFILE = "GET_USER_PROFILE";

const initialState: GetUserProfileResponseType = {} as GetUserProfileResponseType;

type GetUserProfileActionType = ReturnType<typeof getUserProfileAC>
type currentUserReducerActionTypes = GetUserProfileActionType

export const currentUserReducer = (state: GetUserProfileResponseType = initialState, action: currentUserReducerActionTypes): GetUserProfileResponseType => {
  switch (action.type) {
    case "GET_USER_PROFILE": {
      const {user} = action.payload;
      return user
    }

    default: return state;
  }
}


export const getUserProfileAC = (user: GetUserProfileResponseType) => ({
  type: GET_USER_PROFILE,
  payload: {
    user
  }
})