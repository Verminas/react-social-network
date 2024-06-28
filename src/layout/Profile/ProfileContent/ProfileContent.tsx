import s from "./ProfileContent.module.css";
import React from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../../components/Avatar/Avatar";
import {ProfilePagePropsType} from "../Profile";
import {ProfileInfoType} from "../../../redux/stateData";

export const ProfileContent = ({profilePage: {profileInfo, postItemsData}}: ProfilePagePropsType) => {
  return (
    <div className={s.content}>
      <Avatar isProfileImg src={profileInfo.profileImage}/>
      <ProfileInfo profileInfo={profileInfo}/>
      <ProfilePosts postItemsData={postItemsData}/>
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