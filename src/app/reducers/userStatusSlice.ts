import { socialAPI } from "../../api/socialAPI";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createAppSlice({
  name: "userStatus",
  initialState: {
    status: null,
  } as UserStatusStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      getUserStatus: createAThunk<UserStatusStateType, number>(
        async (userId, thunkAPI) => {
          const {} = thunkAPI;
          const res = await socialAPI.getUserStatus(userId);
          return { status: res };
        },
        {
          fulfilled: (state, action) => {
            state.status = action.payload.status;
          },
        },
      ),
      updateUserStatus: createAThunk<
        UserStatusStateType,
        { userId: number; title: string }
      >(
        async (arg, thunkAPI) => {
          const { rejectWithValue, dispatch } = thunkAPI;
          const { title } = arg;

          const res = await socialAPI.updateUserStatus(title);
          if (res.resultCode === 0) {
            return { status: title };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.status = action.payload.status;
          },
        },
      ),
    };
  },
  selectors: {
    selectUserStatus: (sliceState) => sliceState.status,
  },
});

export const userStatusReducer = slice.reducer;
export const userStatusActions = slice.actions;
export const { selectUserStatus } = slice.selectors;

type UserStatusStateType = {
  status: null | string;
};
