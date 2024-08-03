import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': ''
  }
})

type UserPhotosType = {
  small: string | null,
  large: string | null
}

export type UserType = {
  name: string
  id: number
  photos: UserPhotosType
  status: string | null
  followed: boolean
}

export type GetUserProfileResponseType = {
  fullName: string
  userId: number
  aboutMe: string | null
  photos: UserPhotosType
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  contacts: UserProfileContacts
}

type UserProfileContacts = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type GetUsersResponseType = {
  error: string | null
  totalCount: number
  items: UserType[]
}

type ResponseType = {
  resultCode: number
  messages: string[],
  data: {}
}

export const socialAPI = {
  getUsers(page: number = 1, count: number = 10) {
    return instance.get<GetUsersResponseType>(`/users?page=${page}&count=${count}`)
      .then(data => data.data);
  },

  searchUsers(term: string) {
    return instance.get<GetUsersResponseType>(`/users?term=${term}`)
      .then(data => data.data);
  },

  followUser(userID: number) {
    return instance.post<ResponseType>(`/follow/${userID}`)
      .then(data => data);
  },

  unfollowUser(userID: number) {
    return instance.delete<ResponseType>(`/follow/${userID}`)
      .then(data => data);
  },

  getUserProfile(userID: number) {
    return instance.get<GetUserProfileResponseType>(`/profile/${userID}`)
      .then(data => data.data);
  },
}