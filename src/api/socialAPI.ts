import axios from "axios";
import { apiKey } from "./apiKey";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": apiKey,
  },
});

export const authAPI = {
  authMe() {
    return instance
      .get<AuthMeResponseType>(`auth/me`)
      .then((data) => data.data);
  },

  logIn(payload: UserLogInRequestType) {
    return instance
      .post<ResponseType<UserLogInGenericType>>(`auth/login`, payload)
      .then((data) => data.data);
  },

  logOut() {
    return instance
      .delete<ResponseType>(`auth/login`)
      .then((data) => data.data);
  },
};

export const socialAPI = {
  getUsers(arg: {
    page: number;
    count: number;
    term: string;
    friend: boolean | null;
  }) {
    const { page = 1, count = 10, friend = null, term = "" } = arg;
    return instance
      .get<GetUsersResponseType>(
        `users?page=${page}&count=${count}&term=${term}&friend=${friend}`,
      )
      .then((data) => data.data);
  },

  followUser(userID: number) {
    return instance.post<ResponseType>(`follow/${userID}`).then((data) => data);
  },

  unfollowUser(userID: number) {
    return instance
      .delete<ResponseType>(`follow/${userID}`)
      .then((data) => data);
  },

  getUserProfile(userID: number) {
    return instance
      .get<GetUserProfileResponseType>(`profile/${userID}`)
      .then((data) => data.data);
  },

  getUserStatus(userId: number) {
    return instance
      .get<string | null>(`profile/status/${userId}`)
      .then((data) => data.data);
  },

  updateUserStatus(status: string) {
    const payload = { status };
    return instance
      .put<ResponseType>(`profile/status`, payload)
      .then((data) => data.data);
  },

  updateUserPhoto(formData: FormData) {
    return instance
      .put<ResponseType>(`profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => data.data);
  },
};

type UserLogInGenericType = {
  userId: number;
};

type UserPhotosType = {
  small: string | null;
  large: string | null;
};

export type UserLogInRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UserType = {
  name: string;
  id: number;
  photos: UserPhotosType;
  status: string | null;
  followed: boolean;
};

export type GetUserProfileResponseType = {
  fullName: string;
  userId: number;
  aboutMe: string | null;
  photos: UserPhotosType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  contacts: UserProfileContacts;
};

type UserProfileContacts = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type GetUsersResponseType = {
  error: string | null;
  totalCount: number;
  items: UserType[];
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

type AuthMeInfoType = {
  email: string;
  login: string;
  id: number;
};

type FieldErrorsType = {
  fieldsErrors: string[];
};

type AuthMeResponseType = ResponseType<AuthMeInfoType> & FieldErrorsType;
