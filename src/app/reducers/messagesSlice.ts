import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import {
  BaseResponseType,
  GetMessagesRequestType,
  MessageResponseType,
  MessageType,
  SendMessageRequestType,
  socialAPI,
} from "api/socialAPI";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type InitialStateType = {
  totalCount: number;
  messages: MessageType[];
};

const slice = createAppSlice({
  name: "messages",
  initialState: {
    totalCount: 0,
    messages: [],
  } as InitialStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      clearData: creators.reducer((state) => {
        state.totalCount = 0;
        state.messages = [];
      }),
      fetchMessages: createAThunk<InitialStateType, GetMessagesRequestType>(
        async (arg, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await socialAPI.getMessages(arg);
          if (!res.error) {
            return { messages: res.items, totalCount: res.totalCount };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.totalCount = action.payload.totalCount;
            state.messages = action.payload.messages;
          },
        },
      ),
      sendMessage: createAThunk<
        BaseResponseType<MessageResponseType>,
        SendMessageRequestType
      >(
        async (arg, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await socialAPI.sendMessage(arg);
          if (res.resultCode === 0) {
            return res;
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.messages.push(action.payload.data.message);
          },
        },
      ),
    };
  },
  selectors: {
    selectMessages: (sliceState) => sliceState.messages,
    selectMessagesCount: (sliceState) => sliceState.totalCount,
  },
});

export const messagesReducer = slice.reducer;
export const messagesActions = slice.actions;
export const { selectMessages, selectMessagesCount } = slice.selectors;
