import s from "./ProfileContent.module.css";
import React, {useEffect, useState} from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../../components/Avatar/Avatar";
import {MessageType} from "../../../redux/stateData";
import {GetUserProfileResponseType, socialAPI} from "../../../api/socialAPI";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {myId} from "../../../App";

type ProfileContentPropsType = {
  user: GetUserProfileResponseType
  posts: MessageType[]
  addNewPost: (message: string) => void
  isAuthUser: boolean
}

const noInformation = 'no information';

export const ProfileContent = ({user, addNewPost, posts, isAuthUser}: ProfileContentPropsType) => {
  const updatePhoto = () => {

  }

  return (
    <div className={s.content}>
      <div className={s.wrapperCommon}>
        <div className={s.wrapperItem}>
          <Avatar src={user.photos?.small || null} isProfileImg/>
          {isAuthUser ? <button disabled>Update photo</button> : ''}
        </div>
        <ProfileInfo user={user}/>
      </div>
      <ProfilePosts posts={posts} addNewPost={addNewPost} userID={user.userId}/>
    </div>
  )
}

type ProfileInfoPropsType = {
  user: GetUserProfileResponseType
}

const ProfileInfo = ({
                       user: {
                         userId,
                         lookingForAJobDescription,
                         lookingForAJob,
                         aboutMe,
                         fullName,
                         contacts
                       }
                     }: ProfileInfoPropsType) => {
  const [status, setStatus] = useState<string | null>('')

  // заглушка с id иначе запрос от undefined
  useEffect(() => {
    socialAPI.getUserStatus(userId || 31421)
      .then(data => setStatus(data))
  }, []);

  const changeStatus = (title: string) => {
    socialAPI.updateUserStatus(title)
      .then(data => socialAPI.getUserStatus(userId || 31421))
      .then(data => setStatus(data))
  }

  return (
    <div className={s.info} key={userId}>
      <h2>{fullName}</h2>
      <h3>My status: {userId === myId
        ? <EditableSpan title={status || noInformation} editItem={changeStatus}/>
        : <span>{status || noInformation}</span>
      }</h3>
      <h3>About me: {aboutMe || noInformation}</h3>
      <h3>{lookingForAJob ? `Loking for a job: ${lookingForAJobDescription}` : ''}</h3>
      <h3>My contacts</h3>
      <ul>
        <li>Github: <a href="">{contacts?.github || noInformation}</a></li>
        <li>Instagram: <a href="">{contacts?.instagram || noInformation}</a></li>
        <li>Facebook: <a href="">{contacts?.facebook || noInformation}</a></li>
      </ul>
    </div>
  )
}