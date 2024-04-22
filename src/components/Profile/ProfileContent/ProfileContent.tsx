import s from "./ProfileContent.module.css";
import React from "react";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";

type ProfileContentPropsType = {
  postItemsData: object[]
}

export const ProfileContent = (props: ProfileContentPropsType) => {
  return (
    <div className={s.content}>
      <ProfileLogo/>
      <ProfileInfo/>
      <ProfilePosts postItemsData={props.postItemsData}/>
    </div>
  )
}
const ProfileLogo = () => {
  return (
    <img className={s.img}
         src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
         alt="profile-logo"/>
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