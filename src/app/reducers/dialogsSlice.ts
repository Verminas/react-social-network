import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { GetDialogsResponseType, socialAPI } from "common/instance/socialAPI";
import { authAPI } from "features/Auth/api/authAPI";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type InitialStateType = {
  dialogs: GetDialogsResponseType;
};

const slice = createAppSlice({
  name: "dialogs",
  initialState: {
    dialogs: [],
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
  },
});

export const dialogsReducer = slice.reducer;
export const dialogsActions = slice.actions;
export const { selectDialogs } = slice.selectors;
