import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import {
  GetDialogsResponseType,
  socialAPI,
} from "features/SocialNetwork/api/socialAPI";
import { authAPI } from "features/Auth/api/authAPI";
import { StatusType } from "app/appSlice";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type InitialStateType = {
  dialogs: GetDialogsResponseType;
  status: StatusType;
};

const slice = createAppSlice({
  name: "dialogs",
  initialState: {
    dialogs: [],
    status: "idle",
  } as InitialStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      fetchDialogs: createAThunk<
        { dialogs: GetDialogsResponseType },
        undefined
      >(
        async (arg, thunkAPI) => {
          const res = await socialAPI.getDialogs();
          return { dialogs: res };
        },
        {
          fulfilled: (state, action) => {
            state.dialogs = action.payload.dialogs;
            state.status = "succeeded";
          },
          pending: (state, action) => {
            state.status = "loading";
          },
          rejected: (state, action) => {
            state.status = "failed";
          },
        },
      ),
      startDialog: createAThunk<any, number>(async (userID, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        const res = await socialAPI.startUserDialog(userID);
        if (res.resultCode === 0) {
          return res;
        } else {
          return rejectWithValue(res);
        }
      }),
    };
  },
  selectors: {
    selectDialogs: (sliceState) => sliceState.dialogs,
    selectDialogsStatus: (sliceState) => sliceState.status,
  },
});

export const dialogsReducer = slice.reducer;
export const dialogsActions = slice.actions;
export const { selectDialogs, selectDialogsStatus } = slice.selectors;
