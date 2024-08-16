import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";
import {BackImg} from "../BackImg/BackImg";
import {MessageType} from "../../redux/stateData";
import {GetUserProfileResponseType, socialAPI} from "../../api/socialAPI";

export type ProfilePagePropsType = {
  posts: MessageType[]
  addNewPost: (message: string) => void
  user: GetUserProfileResponseType
  isAuthUser: boolean
}

export const Profile = ({addNewPost, posts, user, isAuthUser}: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg src={user.photos?.large || null}/>
      <ProfileContent user={user} posts={posts} addNewPost={addNewPost} isAuthUser={isAuthUser}/>
    </section>
  )
}