// @flow
import * as React from "react";
import { useParams } from "react-router-dom";
import { createContext, useEffect } from "react";
import { Profile, ProfilePagePropsType } from "../Profile/Profile";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { selectUser, usersActions } from "app/reducers/usersSlice";
import { selectCurrentUser } from "app/reducers/currentUserSlice";
import { GetUserProfileResponseType } from "api/socialAPI";

type Props = {};

export const UserContext = createContext<{
  user: GetUserProfileResponseType | any;
}>({ user: null });

export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const viewedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const user =
    Number(params.userId) === currentUser.userId ? currentUser : viewedUser;

  useEffect(() => {
    const userId = Number(params.userId);
    if (userId !== currentUser.userId && !isNaN(userId)) {
      dispatch(usersActions.getUserProfile(userId));
    }
  }, [params]);

  return (
    <UserContext.Provider value={{ user }}>
      <div>
        {user.userId ? (
          <Profile isAuthUser={viewedUser?.userId === currentUser.userId} />
        ) : (
          <span>User not found</span>
        )}
      </div>
    </UserContext.Provider>
  );
};
