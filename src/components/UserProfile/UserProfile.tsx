// @flow
import * as React from 'react';
import {GetUserProfileResponseType, socialAPI} from "../../api/socialAPI";
import {Avatar} from "../Avatar/Avatar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Profile} from "../../layout/Profile/Profile";
import {myId} from "../../App";

type Props = {
};



export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<GetUserProfileResponseType | null>(null);

  useEffect(() => {
    socialAPI.getUserProfile(Number(params.userId))
      .then(user => setUser(user))
  }, []);


  return (
    <div>
      {user
      ? <Profile currentUser={user} posts={[]} addNewPost={() => {}} isAuthUser={user.userId === myId}/>
        : <span>User not found</span>
      }
    </div>
  );
};