import s from "./ProfileContent.module.css";
import React from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Avatar} from "../../../components/Avatar/Avatar";

type ProfileContentPropsType = {
  postItemsData: Array<{
    id: string,
    postMessage: string,
  }>,
}

export const ProfileContent = (props: ProfileContentPropsType) => {
  return (
    <div className={s.content}>
      <Avatar isProfileImg/>
      <ProfileInfo/>
      <ProfilePosts postItemsData={props.postItemsData}/>
    </div>
  )
}
const ProfileInfo = () => {
  return (
    <div className={s.info}>
      <h2>Dmitry K.</h2>
      <ul>
        <li>Date of Birth: <span>2 january</span></li>
        <li>City: <span>Minsk</span></li>
        <li>Education: <span>BSU'11</span></li>
        <li>Web-Site: <span>https: //it-kamasutra.com</span></li>
      </ul>
    </div>
  )
}