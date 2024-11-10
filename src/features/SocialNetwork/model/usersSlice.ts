import {
  GetUserProfileResponseType,
  socialAPI,
  UserType
} from "features/SocialNetwork/api/socialAPI";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { StatusType } from "app/appSlice";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

type InitialStateType = {
  users: UserType[],
  user: GetUserProfileResponseType,
  totalCount: number,
  status: StatusType
};

const slice = createAppSlice({
  name: "users",
  initialState: {
    users: [],
    user: {} as GetUserProfileResponseType,
    status: "idle",
    totalCount: 0
  } as InitialStateType,
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | unknown;
    }>();

    return {
      clearUserData: creators.reducer((state, action) => {
        state.user = {} as GetUserProfileResponseType;
      }),
      fetchUsers: createAThunk<
        FetchUsersType,
        { page: number; count: number; term: string; friend: boolean | null }
      >(
        async (arg, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          const res = await socialAPI.getUsers(arg);
          if (!res.error) {
            return { users: res.items, totalCount: res.totalCount };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            state.users = action.payload.users;
            state.totalCount = action.payload.totalCount;
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
      getUserProfile: createAThunk<GetUserType, number>(
        async (userId, thunkAPI) => {
          const res = await socialAPI.getUserProfile(userId);
          return { user: res };
        },
        {
          fulfilled: (state, action) => {
            state.user = action.payload.user;
          }
        }
      ),
      followUser: createAThunk<FollowUnfollowUserType, number>(
        async (userId, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;

          const res = await socialAPI.followUser(userId);
          if (res.data.resultCode === 0) {
            return { userId };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            const user = state.users.find(
              (u) => u.id === action.payload.userId
            );
            if (user) {
              user.followed = true;
            }
          }
        }
      ),
      unfollowUser: createAThunk<FollowUnfollowUserType, number>(
        async (userId, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;

          const res = await socialAPI.unfollowUser(userId);
          if (res.data.resultCode === 0) {
            return { userId };
          } else {
            return rejectWithValue(res);
          }
        },
        {
          fulfilled: (state, action) => {
            const user = state.users.find(
              (u) => u.id === action.payload.userId
            );
            if (user) {
              user.followed = false;
            }
          }
        }
      )
    };
  },
  selectors: {
    selectUsers: (sliceState) => sliceState.users,
    selectUser: (sliceState) => {
      return sliceState.user;
    },
    selectUsersTotalCount: (sliceState) => sliceState.totalCount,
    selectStatus: (sliceState) => sliceState.status
  }
});

export const usersSlice = slice.reducer;
export const usersActions = slice.actions;
export const { selectUser, selectUsersTotalCount, selectUsers, selectStatus} =
  slice.selectors;

type FetchUsersType = {
  users: UserType[];
  totalCount: number;
};
type GetUsersType = {
  users: UserType[];
};
type GetUserType = {
  user: GetUserProfileResponseType;
};
type FollowUnfollowUserType = {
  userId: number;
};
