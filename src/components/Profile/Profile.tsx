import React from "react";
import s from "./Profile.module.css";
import {ProfileContent} from "./ProfileContent/ProfileContent";

export const Profile = () => {
  return (
    <section className={s.profile}>
      <BackImg/>
      <ProfileContent />
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


