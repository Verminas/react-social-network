import s from "./ProfileContent.module.css";
import React from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../Avatar/Avatar";
import {MessageType} from "../../../redux/stateData";
import {GetUserProfileResponseType} from "../../../api/socialAPI";
import {ProfileInfo} from "../ProfileInfo/ProfileInfo";

type ProfileContentPropsType = {
  user: GetUserProfileResponseType
  posts: MessageType[]
  addNewPost: (message: string) => void
  isAuthUser: boolean
}

export const ProfileContent = ({user, addNewPost, posts, isAuthUser}: ProfileContentPropsType) => {
  const updatePhoto = () => {}

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