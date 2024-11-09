import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { GetNewsRequestType, GetNewsResponseType, newsAPI, NewsItemType } from "../api/newsAPI";
import { StatusType } from "app/appSlice";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

type InitialStateType = {
  news: NewsItemType[];
  isNone: boolean;
  status: StatusType;
};

const slice = createAppSlice({
  name: "news",
  initialState: {
    isNone: false,
    news: [],
    status: "idle"
  } as InitialStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      fetchNews: createAThunk<
        { news: GetNewsResponseType },
        GetNewsRequestType
      >(
        async (arg, thunkAPI) => {
          const res = await newsAPI.getNews(arg);
          return { news: res };
        },
        {
          fulfilled: (state, action) => {
            state.news = action.payload.news.data;
            state.isNone = !action.payload.news.pagination.total
            state.status = "succeeded"
          },
          pending: state => {
            state.status = "loading"
          },
          rejected: state => {
            state.status = "failed"
          }
        },
      )
    };
  },
  selectors: {
    selectNews: (sliceState) => sliceState.news,
    selectNewsIsNone: (sliceState) => sliceState.isNone,
    selectNewsStatus: (sliceState) => sliceState.status
  }
});

export const newsReducer = slice.reducer;
export const newsActions = slice.actions;
export const { selectNews, selectNewsIsNone, selectNewsStatus } = slice.selectors;
