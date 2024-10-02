import {
  GetUserProfileResponseType,
  socialAPI,
  UpdateUserProfileRequestType,
} from "../../api/socialAPI";
import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { usersActions } from "app/reducers/usersSlice";

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
          const res = await socialAPI.getUserProfile(arg);
          return { user: res };
        },
        {
          fulfilled: (state, action) => {
            state.user = action.payload.user;
          },
        },
      ),
      updateCurrentUserPhoto: createAThunk<
        any,
        { formData: FormData; id: number }
      >(async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        const { formData, id } = arg;
        const res = await socialAPI.updateUserPhoto(formData);
        if (res.resultCode === 0) {
          dispatch(currentUserActions.getCurrentUserProfile(id));
          return res;
        } else {
          return rejectWithValue(res);
        }
      }),
      updateCurrentUserProfile: createAThunk<
        { user: UpdateUserProfileRequestType },
        UpdateUserProfileRequestType
      >(
        async (arg, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          const res = await socialAPI.updateUserProfile(arg);
          if (res.resultCode === 0) {
            return { user: arg };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.user = { ...state.user, ...action.payload.user };
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
