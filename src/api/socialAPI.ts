import axios from "axios";
import { apiKey } from "./apiKey";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": apiKey,
  },
});

// authorization

export const authAPI = {
  authMe() {
    return instance
      .get<AuthMeResponseType>(`auth/me`)
      .then((data) => data.data);
  },

  logIn(payload: UserLogInRequestType) {
    return instance
      .post<BaseResponseType<UserLogInGenericType>>(`auth/login`, payload)
      .then((data) => data.data);
  },

  logOut() {
    return instance
      .delete<BaseResponseType>(`auth/login`)
      .then((data) => data.data);
  },
};

// social

export const socialAPI = {
  // users
  getUsers(arg: {
    page: number;
    count: number;
    term: string;
    friend: boolean | null;
  }) {
    const { page = 1, count = 10, friend = null, term = "" } = arg;
    return instance
      .get<
        GetResponseType<UserType[]>
      >(`users?page=${page}&count=${count}&term=${term}&friend=${friend}`)
      .then((data) => data.data);
  },

  // following

  followUser(userID: number) {
    return instance
      .post<BaseResponseType>(`follow/${userID}`)
      .then((data) => data);
  },

  unfollowUser(userID: number) {
    return instance
      .delete<BaseResponseType>(`follow/${userID}`)
      .then((data) => data);
  },

  // profile
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
      .put<BaseResponseType>(`profile/status`, payload)
      .then((data) => data.data);
  },

  updateUserPhoto(formData: FormData) {
    return instance
      .put<BaseResponseType>(`profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => data.data);
  },
  updateUserProfile(payload: UpdateUserProfileRequestType) {
    return instance
      .put<BaseResponseType>(`profile/`, payload)
      .then((data) => data.data);
  },

  // dialogs

  startUserDialog(userID: number) {
    return instance
      .put<BaseResponseType>(`dialogs/${userID}`)
      .then((data) => data.data);
  },
  getDialogs() {
    return instance
      .get<GetDialogsResponseType>(`dialogs/`)
      .then((data) => data.data);
  },
  getMessages(params: GetMessagesRequestType) {
    const { userId, page = 1, count = 10 } = params;
    return instance
      .get<
        GetResponseType<MessageType[]>
      >(`dialogs/${userId}/messages?page=${page}&count=${count}`)
      .then((data) => data.data);
  },
  sendMessage(params: SendMessageRequestType) {
    const { userId, message } = params;
    const payload = { body: message };
    return instance
      .post<
        BaseResponseType<MessageResponseType>
      >(`dialogs/${userId}/messages`, payload)
      .then((data) => data.data);
  },
};

export type SendMessageRequestType = { userId: number; message: string };

export type MessageResponseType = {
  message: CommonMessageType;
};

type CommonMessageType = {
  addedAt: string;
  body: string;
  id: string;
  recipientId: number;
  senderId: number;
  senderName: string;
  translatedBody: null | string;
  viewed: boolean;

  deletedByRecipient: boolean;
  deletedBySender: boolean;
  distributionId: null | string;
  isSpam: boolean;
  recipientName: string;
};

export type MessageType = Omit<
  CommonMessageType,
  | "deletedByRecipient"
  | "deletedBySender"
  | "distributionId"
  | "isSpam"
  | "recipientName"
>;

export type GetMessagesRequestType = {
  userId: number;
  page?: number;
  count?: number;
};

export type GetDialogsResponseType = GetDialogResponseType[];
export type GetDialogResponseType = {
  hasNewMessages: boolean;
  id: number;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: UserPhotosType;
  userName: string;
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

export type UpdateUserProfileRequestType = Omit<
  GetUserProfileResponseType,
  "userId" | "photos"
>;

export type UserProfileContacts = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type GetResponseType<T = {}> = {
  error: string | null;
  totalCount: number;
  items: T;
};

export type BaseResponseType<D = {}> = {
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

type AuthMeResponseType = BaseResponseType<AuthMeInfoType> & FieldErrorsType;
