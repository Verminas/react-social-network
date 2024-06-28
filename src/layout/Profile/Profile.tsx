import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";
import {BackImg} from "../../components/BackImg/BackImg";
import {ProfilePageType} from "../../redux/stateData";

export type ProfilePagePropsType = {
  profilePage: ProfilePageType
}

export const Profile = ({profilePage}: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent profilePage={profilePage}/>
    </section>
  )
}