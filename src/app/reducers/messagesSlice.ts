import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import {
  BaseResponseType,
  GetMessagesRequestType,
  MessageResponseType,
  MessageType,
  SendMessageRequestType,
  socialAPI,
} from "api/socialAPI";
import { StatusType } from "app/reducers/appSlice";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type InitialStateType = {
  totalCount: number;
  messages: MessageType[];
  status: StatusType;
};

const slice = createAppSlice({
  name: "messages",
  initialState: {
    totalCount: 0,
    messages: [],
    status: "idle",
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
      fetchMessages: createAThunk<
        { messages: MessageType[]; totalCount: number },
        GetMessagesRequestType
      >(
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
            state.status = "succeeded";
          },
          pending: (state, action) => {
            state.status = "loading";
          },
          rejected: (state) => {
            state.status = "failed";
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
            debugger;
            return res;
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            debugger;
            state.messages.push(action.payload.data.message);
            state.totalCount += 1;
          },
        },
      ),
      deleteMessage: createAThunk<{ id: string }, string>(
        async (messageId, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await socialAPI.deleteMessage(messageId);
          if (res.resultCode === 0) {
            return { id: messageId };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.messages.findIndex(
              (m) => m.id === action.payload.id,
            );
            if (index > -1) {
              state.messages.splice(index, 1);
            }
          },
        },
      ),
    };
  },
  selectors: {
    selectMessages: (sliceState) => sliceState.messages,
    selectMessagesCount: (sliceState) => sliceState.totalCount,
    selectMessagesStatus: (sliceState) => sliceState.status,
  },
});

export const messagesReducer = slice.reducer;
export const messagesActions = slice.actions;
export const { selectMessages, selectMessagesCount, selectMessagesStatus } =
  slice.selectors;
