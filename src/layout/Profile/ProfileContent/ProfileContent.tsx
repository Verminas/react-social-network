import s from "./ProfileContent.module.css";
import React from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../../components/Avatar/Avatar";
import {MessageType, ProfileInfoType} from "../../../redux/stateData";

type ProfileContentPropsType = {
  profileInfo: ProfileInfoType
  posts: MessageType[]
  addNewPost: (message: string) => void
}

export const ProfileContent = ({profileInfo, addNewPost, posts}: ProfileContentPropsType) => {
  return (
    <div className={s.content}>
      <Avatar src={profileInfo.avatarSrc} isProfileImg/>
      <ProfileInfo profileInfo={profileInfo}/>
      <ProfilePosts posts={posts} addNewPost={addNewPost} userID={profileInfo.id}/>
    </div>
  )
}

type ProfileInfoPropsType = {
  profileInfo: ProfileInfoType
}

const ProfileInfo = ({profileInfo:{country, name, city, website, dateBirth, education}}: ProfileInfoPropsType) => {
  return (
    <div className={s.info}>
      <h2>{name}</h2>
      <ul>
        <li>Date of Birth: <span>{dateBirth}</span></li>
        <li>City: <span>{`${country}, ${city}`}</span></li>
        <li>Education: <span>{education}</span></li>
        <li>Web-Site: <a href={website}>{website}</a></li>
      </ul>
    </div>
  )
}