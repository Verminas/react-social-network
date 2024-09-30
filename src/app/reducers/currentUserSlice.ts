import { GetUserProfileResponseType, socialAPI } from "../../api/socialAPI";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: "currentUser",
  initialState: {
    user: {} as GetUserProfileResponseType,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      getCurrentUserProfile: createAThunk<
        { user: GetUserProfileResponseType },
        number
      >(
        async (arg, thunkAPI) => {
          const {} = thunkAPI;
          const res = await socialAPI.getUserProfile(arg);
          return { user: res };
        },
        {
          fulfilled: (state, action) => {
            state.user = action.payload.user;
          },
        },
      ),
    };
  },
  selectors: {
    selectCurrentUser: (sliceState) => sliceState.user,
  },
});

export const currentUserSlice = slice.reducer;
export const currentUserActions = slice.actions;
export const { selectCurrentUser } = slice.selectors;
