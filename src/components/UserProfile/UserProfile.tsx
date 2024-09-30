// @flow
import * as React from "react";
import { GetUserProfileResponseType } from "../../api/socialAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Profile } from "../Profile/Profile";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { selectUser, usersActions } from "../../app/reducers/usersSlice";
import { selectCurrentUser } from "../../app/reducers/currentUserSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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
        <Profile
          user={viewedUser}
          posts={[]}
          addNewPost={() => {}}
          isAuthUser={viewedUser.userId === currentUser.userId}
        />
      ) : (
        <span>User not found</span>
      )}
    </div>
  );
};
