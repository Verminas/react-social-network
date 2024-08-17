// @flow
import * as React from 'react';
import {GetUserProfileResponseType} from "../../api/socialAPI";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Profile} from "../Profile/Profile";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../app/selectors";
import {useAppDispatch} from "../../app/store";
import {getUserProfileTC} from "../../app/reducers/usersReducer";

type Props = {
};



export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<GetUserProfileResponseType | null | void>(null);
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = Number(params.userId)
    if(currentUser.userId) {
      if (currentUser.userId && currentUser.userId === userId) {
        setUser(currentUser)
        return;
      } else {
        dispatch(getUserProfileTC(userId))
          .then(user => {
            debugger
            setUser(user)
          })
      }
    }
  }, [params,currentUser]);


  return (
    <div>
      {user
      ? <Profile user={user} posts={[]} addNewPost={() => {}} isAuthUser={user.userId === currentUser.userId}/>
        : <span>User not found</span>
      }
    </div>
  );
};