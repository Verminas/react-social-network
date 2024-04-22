import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";

type ProfilePagePropsType = {
  profilePage: {
    postItemsData: Array<{
      id: string,
      postMessage: string,
    }>,
  }
}

export const Profile = (props: ProfilePagePropsType) => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent postItemsData={props.profilePage.postItemsData}/>
    </section>
  )
}

const BackImg = () => {
  return (
    <img className={s.backImg}
         src="https://kalix.club/uploads/posts/2022-12/1671644344_kalix-club-p-fon-sotsseti-pinterest-5.jpg"
         alt="profile-background"/>
  )
}