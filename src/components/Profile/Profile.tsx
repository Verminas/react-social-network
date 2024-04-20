import React from "react";
import s from "./Profile.module.css";

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


const ProfileContent = () => {
  return (
  <div className={s.content}>
    <ProfileLogo/>
    <ProfileInfo/>
    <ProfilePosts/>
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

const ProfilePosts = () => {
  return (
    <div className={s.posts}>
      <MyPost/>
      <PostItems/>
    </div>
  )
}

const MyPost = () => {
  return (
    <div className={s.myPost}>
      <h2 className={s.myPostTitle}>My posts</h2>
      <textarea className={s.myPostTextarea} name="textarea" id="1"
                placeholder={'your news...'}></textarea>
      <button className={s.myPostButton} type={"submit"}>Send</button>
    </div>
  )
}

const PostItems = () => {
  return (
    <div className={s.postsItems}>
      <PostItem/>
    </div>
  )
}

const PostItem = () => {
  return (
    <div className={s.postsItem}>
      <img className={s.postsItemImg}
           src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
           alt="profile-logo-post"/>
      <p>Hey, why nobody love me?</p>
    </div>
  )
}


