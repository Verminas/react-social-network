import s from "./ProfileContent.module.css";
import React, {useEffect, useState} from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../Avatar/Avatar";
import {MessageType} from "../../../redux/stateData";
import {GetUserProfileResponseType, socialAPI} from "../../../api/socialAPI";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {myId} from "../../../App";
import {useSelector} from "react-redux";
import {AppRootType} from "../../../store/store";

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
  const currentUser = useSelector<AppRootType, GetUserProfileResponseType>(state => state.currentUser)
  // заглушка с id иначе запрос от undefined
  useEffect(() => {
    socialAPI.getUserStatus(userId || 31421)
      .then(data => setStatus(data))
  }, [userId]);

  const changeStatus = (title: string) => {
    socialAPI.updateUserStatus(title)
      .then(data => socialAPI.getUserStatus(userId || 31421))
      .then(data => setStatus(data))
  }

  return (
    <div className={s.info} key={userId}>
      <h2>{fullName}</h2>
      <h3>My status: {userId === currentUser.userId
        ? <EditableSpan title={status || noInformation} editItem={changeStatus}/>
        : <span>{status || noInformation}</span>
      }</h3>
      <h3>About me: {aboutMe || noInformation}</h3>
      <h3>{lookingForAJob ? `Loking for a job: ${lookingForAJobDescription}` : ''}</h3>
      <h3>My contacts</h3>
      <ul>
        <li>Github: {contacts.github ?
          <a href={contacts.github} target={'_blank'}>{contacts.github}</a> : noInformation}</li>
        <li>Instagram: {contacts.instagram ?
          <a href={contacts.instagram} target={'_blank'}>{contacts.instagram}</a> : noInformation}</li>
        <li>Facebook: {contacts.facebook ?
          <a href={contacts.facebook} target={'_blank'}>{contacts.facebook}</a> : noInformation}</li>
      </ul>
    </div>
  )
}