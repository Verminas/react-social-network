import {
  BaseResponseType,
  instance,
  UserLogInRequestType,
} from "common/instance/socialAPI";

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

type UserLogInGenericType = {
  userId: number;
};
type AuthMeResponseType = BaseResponseType<AuthMeInfoType> & FieldErrorsType;
type AuthMeInfoType = {
  email: string;
  login: string;
  id: number;
};

type FieldErrorsType = {
  fieldsErrors: string[];
};
