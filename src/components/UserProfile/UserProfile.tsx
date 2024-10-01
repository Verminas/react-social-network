// @flow
import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Profile } from "../Profile/Profile";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { selectUser, usersActions } from "app/reducers/usersSlice";
import { selectCurrentUser } from "app/reducers/currentUserSlice";

type Props = {};

export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const viewedUser = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = Number(params.userId);
    dispatch(usersActions.getUserProfile(userId));
  }, [params]);

  return (
    <div>
      {viewedUser.userId ? (
        <Profile isAuthUser={viewedUser.userId === currentUser.userId} />
      ) : (
        <span>User not found</span>
      )}
    </div>
  );
};
