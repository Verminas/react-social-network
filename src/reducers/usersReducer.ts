const FOLLOW_UNFOLLOW_USER = 'FOLLOW_UNFOLLOW_USER'
const SHOW_MORE_USERS = 'SHOW_MORE_USERS'

export const showMoreUsersAC = (users: UserType[]) => ({
  type: SHOW_MORE_USERS,
  payload: {
    users
  }
}) as const

export const followUnfollowUserAC = (userId: string, isFollowed: boolean) => ({
  type: FOLLOW_UNFOLLOW_USER,
  payload: {
    userId,
    isFollowed
  }
}) as const

type ShowMoreUsersActionType = ReturnType<typeof showMoreUsersAC>
type FollowUnfollowUserActionType = ReturnType<typeof followUnfollowUserAC>

const initialState: UserType[]  = [
  {
    userId: 'sdfgu',
    name: 'User 1',
    country: 'Belarus',
    city: 'Brest',
    status: 'I would like to find new friends',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/254',
    isFollowed: false
  },
  {
    userId: 'sdfgu1',
    name: 'User 2',
    country: 'Poland',
    city: 'Krakow',
    status: 'I would like to find new friends',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/253',
    isFollowed: true
  },
  {
    userId: 'sdfgu2',
    name: 'User 3',
    country: 'Poland',
    city: 'Krakow',
    status: 'I would like to find new friends',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/250',
    isFollowed: false
  },
]
export type UserType = {
  userId: string
  name: string
  country: string
  city: string
  status: string
  avatarSrc: string
  isFollowed: boolean
}

type UsersReducerActionTypes = ShowMoreUsersActionType | FollowUnfollowUserActionType

export const usersReducer = (state: UserType[] = initialState, action: UsersReducerActionTypes): UserType[] => {
  switch (action.type) {
    case SHOW_MORE_USERS: {
      const {users} = action.payload;
      const newUsers: UserType[] = users.map(user => ({...user}));
      return [...state, ...newUsers];
    }
    case FOLLOW_UNFOLLOW_USER: {
      const {userId, isFollowed} = action.payload;
      return state.map(u => u.userId === userId ? {...u, isFollowed: !isFollowed} : u);
    }
    default: return state;
  }
}