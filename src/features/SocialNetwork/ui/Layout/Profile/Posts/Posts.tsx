import s from "features/SocialNetwork/ui/Layout/Profile/Posts/Posts.module.css";
import React, { useContext } from "react";
import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";

export const Posts = () => {
  const { user, isAuthUser } = useContext(UserContext);
  const onClickHandler = (value: string) => {
    alert(value);
  };

  return (
    <div className={s.posts}>
      <div className={s.myPost}>
        <h2 className={s.myPostTitle}>{isAuthUser ? "My posts" : "Posts"}</h2>
        <SubmitForm
          onSubmitForm={onClickHandler}
          placeholder={"your news..."}
        />
      </div>
      <div className={s.postsItems}></div>
    </div>
  );
};
