import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";
import {BackImg} from "../../components/BackImg/BackImg";
import {MessageType, ProfilePageType} from "../../redux/stateData";

export type ProfilePagePropsType = {
  profilePage: ProfilePageType
  posts: MessageType[]
  addNewPost: (message: string) => void
}

export const Profile = ({profilePage, posts, addNewPost}: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent profilePage={profilePage} posts={posts} addNewPost={addNewPost}/>
    </section>
  )
}