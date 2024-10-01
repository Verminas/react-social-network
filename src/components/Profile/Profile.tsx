import React from "react";
import s from "./Profile.module.css";
import { ProfileContent } from "./ProfileContent/ProfileContent";
import { BackImg } from "../BackImg/BackImg";
import { useSelector } from "react-redux";
import { selectUser } from "app/reducers/usersSlice";
import { MessageType } from "redux/stateData";

export type ProfilePagePropsType = {
  isAuthUser: boolean;
};

export const Profile = ({ isAuthUser }: ProfilePagePropsType) => {
  const viewedUser = useSelector(selectUser);

  const posts: MessageType[] = [];
  const addNewPost = () => {};

  return (
    <section className={s.profile}>
      <BackImg src={viewedUser.photos?.large || null} />
      <ProfileContent
        posts={posts}
        addNewPost={addNewPost}
        isAuthUser={isAuthUser}
      />
    </section>
  );
};
