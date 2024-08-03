// @flow
import * as React from 'react';
import {GetUserProfileResponseType, socialAPI} from "../../api/socialAPI";
import {Avatar} from "../Avatar/Avatar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

type Props = {
};



export const UserProfile = ({}: Props) => {
  const params = useParams<{ userId: string }>();
  const [user, setUser] = useState<GetUserProfileResponseType | null>(null);
  const noLokJob = 'It\'s not interesting for me '
  const noInfo = 'no information'

  useEffect(() => {
    socialAPI.getUserProfile(Number(params.userId))
      .then(user => setUser(user))
  }, []);


  return (
    <div>
      {user
      ? <>
          <Avatar isProfileImg={true} src={user.photos.small}/>
          <h3>Full Name: {user.fullName}</h3>
          <h4>About me: {user.aboutMe || noInfo}</h4>
          <h4>Looking for a job: {user.lookingForAJob ? user.lookingForAJobDescription : noLokJob}</h4>
          <h4>Contacts: </h4>
          <ul>
            <li>Facebook: {user.contacts.facebook || noInfo}</li>
            <li>Github: {user.contacts.github || noInfo}</li>
            <li>Vk: {user.contacts.vk || noInfo}</li>
            <li>Twitter: {user.contacts.twitter || noInfo}</li>
            <li>Instagram: {user.contacts.instagram || noInfo}</li>
          </ul>
        </>
        : <span>User not found</span>
      }
    </div>
  );
};