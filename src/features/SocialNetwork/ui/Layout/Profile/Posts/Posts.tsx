import s from "features/SocialNetwork/ui/Layout/Profile/Posts/Posts.module.css";
import React from "react";
import { SubmitForm } from "common/components/SubmitForm/SubmitForm";

export const Posts = () => {
  const onClickHandler = (value: string) => {
    alert(value);
  };

  return (
    <div className={s.posts}>
      <div className={s.myPost}>
        <h2 className={s.myPostTitle}>My posts</h2>
        <SubmitForm
          onSubmitForm={onClickHandler}
          placeholder={"your news..."}
        />
      </div>
      <div className={s.postsItems}></div>;
    </div>
  );
};
