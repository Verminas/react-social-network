import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";
import {BackImg} from "../../components/BackImg/BackImg";
import {MessageType, ProfileInfoType} from "../../redux/stateData";

export type ProfilePagePropsType = {
  profileInfo: ProfileInfoType
  posts: MessageType[]
  addNewPost: (message: string) => void
}

export const Profile = ({profileInfo, addNewPost, posts}: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent profileInfo={profileInfo} posts={posts} addNewPost={addNewPost}/>
    </section>
  )
}