import {
  BaseResponseType,
  UserLogInRequestType,
} from "features/SocialNetwork/api/socialAPI";
import { instanceSocial } from "common/instances/instanceSocial";

export const authAPI = {
  authMe() {
    return instanceSocial
      .get<AuthMeResponseType>(`auth/me`)
      .then((data) => data.data);
  },

  logIn(payload: UserLogInRequestType) {
    return instanceSocial
      .post<BaseResponseType<UserLogInGenericType>>(`auth/login`, payload)
      .then((data) => data.data);
  },

  logOut() {
    return instanceSocial
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
