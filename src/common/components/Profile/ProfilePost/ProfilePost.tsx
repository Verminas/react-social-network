import s from "common/components/Profile/ProfilePost/ProfilePost.module.css";
import React from "react";

type PostItemPropsType = {
  message: string;
};

export const PostItem = (props: PostItemPropsType) => {
  return (
    <div className={s.postsItem}>
      <div className={s.postsItemImg} />
      <p>{props.message}</p>
    </div>
  );
};
