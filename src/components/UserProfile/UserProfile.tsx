// @flow
import * as React from 'react';
import {GetUserProfileResponseType, socialAPI} from "../../api/socialAPI";
import {Avatar} from "../Avatar/Avatar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Profile} from "../Profile/Profile";
import {myId} from "../../App";
import {useSelector} from "react-redux";
import {AppRootType} from "../../store/store";

type Props = {
};



export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<GetUserProfileResponseType | null>(null);
  const currentUser = useSelector<AppRootType, GetUserProfileResponseType>(state => state.currentUser)

  useEffect(() => {
    socialAPI.getUserProfile(Number(params.userId))
      .then(user => {
        setUser(user)
      })
  }, [params]);


  return (
    <div>
      {user
      ? <Profile currentUser={user} posts={[]} addNewPost={() => {}} isAuthUser={user.userId === currentUser.userId}/>
        : <span>User not found</span>
      }
    </div>
  );
};