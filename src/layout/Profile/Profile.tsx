import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";
import {BackImg} from "../../components/BackImg/BackImg";

type ProfilePagePropsType = {
  profilePage: {
    postItemsData: Array<{
      id: string,
      postMessage: string,
    }>,
  }
}

export const Profile = ({profilePage: {postItemsData}}: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent postItemsData={postItemsData}/>
    </section>
  )
}