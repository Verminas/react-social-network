import s from "./ProfilePost.module.css";
import React from "react";

type PostItemPropsType = {
  message: string
}

export const PostItem = (props: PostItemPropsType) => {
  return (
    <div className={s.postsItem}>
      <img className={s.postsItemImg}
           src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
           alt="profile-logo-post"/>
      <p>{props.message}</p>
    </div>
  )
}