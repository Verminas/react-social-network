// @flow
import * as React from 'react';
import {GetUserProfileResponseType} from "../../api/socialAPI";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Profile} from "../Profile/Profile";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/store";
import {selectUser, usersActions} from "../../app/reducers/usersSlice";
import {selectCurrentUser} from "../../app/reducers/currentUserSlice";

type Props = {
};



export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<GetUserProfileResponseType | null | void>(null);
  const currentUser = useSelector(selectCurrentUser)
  const viewedUser = useSelector(selectUser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = Number(params.userId)
    if(currentUser.userId) {
      if (currentUser.userId && currentUser.userId === userId) {
        setUser(currentUser)
        return;
      } else {
        dispatch(usersActions.getUserProfile(userId))
          .then(() => {
            setUser(viewedUser)
          })
      }
    }
  }, [params, currentUser]);


  return (
    <div>
      {user
      ? <Profile user={user} posts={[]} addNewPost={() => {}} isAuthUser={user.userId === currentUser.userId}/>
        : <span>User not found</span>
      }
    </div>
  );
};