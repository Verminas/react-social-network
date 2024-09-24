import {GetUserProfileResponseType, socialAPI, UserType} from "../../api/socialAPI";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";


const createAppSlice = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const slice = createAppSlice({
  name: 'users',
  initialState: {
    users: [] as UserType[],
    user: {} as GetUserProfileResponseType,
    totalCount: 0,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null | unknown }>()

    return {
      fetchUsers: createAThunk<FetchUsersType, number>(async (page, thunkAPI) => {
        const {rejectWithValue} = thunkAPI

        const res = await socialAPI.getUsers(page)
        if (!res.error) {
          return {users: res.items, totalCount: res.totalCount}
        } else {
          return rejectWithValue(res)
        }
      }, {
        fulfilled: (state, action) => {
          state.users = action.payload.users
          state.totalCount = action.payload.totalCount
        }
      }),
      showMoreUsers: createAThunk<GetUsersType, number>(async (page, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const res = await socialAPI.getUsers(page)
        if (!res.error) {
          return {users: res.items}
        } else {
          return rejectWithValue(res)
        }
      }, {
        fulfilled: (state, action) => {
          state.users.push(...action.payload.users)
        }
      }),
      searchUsers: createAThunk<GetUsersType, string>(async (title, thunkAPI) => {
        const {rejectWithValue} = thunkAPI

        const res = await socialAPI.searchUsers(title)
        if (!res.error) {
          return {users: res.items}
        } else {
          return rejectWithValue(res)
        }
      }, {
        fulfilled: (state, action) => {
          state.users = action.payload.users
        }
      }),
      getUserProfile: createAThunk<GetUserType, number>(async (userId, thunkAPI) => {
        const res = await socialAPI.getUserProfile(userId)
        return {user: res}
      }, {
        fulfilled: (state, action) => {
          state.user = action.payload.user
        }
      }),
      followUser: createAThunk<FollowUnfollowUserType, number>(async (userId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI

        const res = await socialAPI.followUser(userId)
        if (res.data.resultCode === 0) {
          return {userId}
        } else {
          return rejectWithValue(res)
        }
      }, {
        fulfilled: (state, action) => {
          const user = state.users.find(u => u.id === action.payload.userId)
          if(user) {
            user.followed = true
          }
        }
      }),
      unfollowUser: createAThunk<FollowUnfollowUserType, number>(async (userId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI

        const res = await socialAPI.unfollowUser(userId)
        if (res.data.resultCode === 0) {
          return {userId}
        } else {
          return rejectWithValue(res)
        }
      }, {
        fulfilled: (state, action) => {
          const user = state.users.find(u => u.id === action.payload.userId)
          if(user) {
            user.followed = false
          }
        }
      }),
    }
  },
  selectors: {
    selectUsers: sliceState => sliceState.users,
    selectUser: sliceState => sliceState.user,
    selectUsersTotalCount: sliceState => sliceState.totalCount,
  }
})

export const usersSlice = slice.reducer
export const usersActions = slice.actions
export const {selectUser, selectUsersTotalCount, selectUsers} = slice.selectors


type FetchUsersType = {
  users: UserType[]
  totalCount: number
}
type GetUsersType = {
  users: UserType[]
}
type GetUserType = {
  user: GetUserProfileResponseType
}
type FollowUnfollowUserType = {
  userId: number
}
