import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { StatusType } from "app/appSlice";
import { localStorageAPI } from "../api/localStorageAPI";
import { AppRootType } from "../../../app/store";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

type InitialStateType = {
  posts: Post[];
  status: StatusType
};

const slice = createAppSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle"
  } as InitialStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      clearData: creators.reducer((state, action) => {
        state.posts = [];
        state.status = "idle";
      }),
      fetchPosts: createAThunk<{ posts: Post[] }, string>(
        async (userId, thunkAPI) => {
          const res = await localStorageAPI.getElement(userId) as { posts: Post[] } | null;
          return { posts: res?.posts || [] };
        },
        {
          fulfilled: (state, action) => {
            state.posts = action.payload.posts;
            state.status = "succeeded";
          },
          pending: state => {
            state.status = "loading";
          },
          rejected: state => {
            state.status = "failed";
          }
        }
      ),
      addPost: createAThunk<{ post: Post }, AddPost>(
        async ({ text, currentUserId }, { getState }) => {
          const data = await localStorageAPI.getElement(currentUserId) as { posts: Post[] } | null;

          const { userId: senderId, fullName, photos: { small } } = (getState() as AppRootType).currentUser.user;
          const post: Post = {
            fullName,
            senderId,
            text,
            photo: small,
            likes: Math.ceil(Math.random() * 10),
            messageId: Date.now().toString()
          };
          const newData = { posts: data ? [post, ...data.posts] : [post] };
          await localStorageAPI.setElement(currentUserId, newData);
          return { post };
        },
        {
          fulfilled: (state, action) => {
            state.posts.unshift(action.payload.post);
            state.status = "succeeded";
          },
          pending: state => {
            state.status = "loading";
          },
          rejected: state => {
            state.status = "failed";
          }
        }
      ),
      deletePost: createAThunk<{ messageId: string }, { userId: string, messageId: string }>(
        async ({ userId, messageId }, { rejectWithValue }) => {
          const data: { posts: Post[] } | null = await localStorageAPI.getElement(userId) as { posts: Post[] } | null;
          if (data) {
            const newData = { posts: data.posts.filter(p => p.messageId !== messageId) };
            await localStorageAPI.setElement(userId, newData);
            return { messageId };
          } else {
            return rejectWithValue(null);
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.posts.findIndex(p => p.messageId === action.payload.messageId);
            if (index > -1) {
              state.posts.splice(index, 1);
            }
            state.status = "succeeded";
          },
          pending: state => {
            state.status = "loading";
          },
          rejected: state => {
            state.status = "failed";
          }
        }
      )
    };
  },
  selectors: {
    selectPosts: (sliceState) => sliceState.posts
  }
});

export const postsReducer = slice.reducer;
export const postsActions = slice.actions;
export const { selectPosts } = slice.selectors;

export type Post = {
  fullName: string;
  senderId: number;
  photo: string | null
  messageId: string

  text: string
  likes: number
}

type AddPost = {
  text: string
  currentUserId: string
}
