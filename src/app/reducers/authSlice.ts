import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { authAPI, UserLogInRequestType } from "../../api/socialAPI";
import { currentUserActions } from "./currentUserSlice";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      initializeApp: createAThunk<AuthReducerInitialType>(
        async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          const res = await authAPI.authMe();
          if (res.resultCode === 0) {
            // todo
            dispatch(currentUserActions.getCurrentUserProfile(res.data.id));
            return { isLoggedIn: true };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          },
        },
      ),
      logIn: createAThunk<AuthReducerInitialType, UserLogInRequestType>(
        async (arg, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI;
          const res = await authAPI.logIn(arg);
          if (res.resultCode === 0) {
            // todo
            dispatch(currentUserActions.getCurrentUserProfile(res.data.userId));
            return { isLoggedIn: true };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          },
        },
      ),
      logOut: createAThunk<AuthReducerInitialType>(
        async (arg, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await authAPI.logOut();
          if (res.resultCode === 0) {
            // todo
            return { isLoggedIn: false };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          },
        },
      ),
    };
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
});

export const authSlice = slice.reducer;
export const { selectIsLoggedIn } = slice.selectors;
export const authActions = slice.actions;

type AuthReducerInitialType = { isLoggedIn: boolean };
