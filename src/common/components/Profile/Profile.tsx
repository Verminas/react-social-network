import React, { useContext } from "react";
import s from "common/components/Profile/Profile.module.css";
import { ProfileContent } from "common/components/Profile/ProfileContent/ProfileContent";
import { BackImg } from "common/components/BackImg/BackImg";
import { useSelector } from "react-redux";
import { selectUser } from "app/reducers/usersSlice";
import { MessageType } from "common/redux/stateData";
import { selectCurrentUser } from "app/reducers/currentUserSlice";
import { MenuContext } from "app/App";
import { UserContext } from "common/components/UserProfile/UserProfile";

export type ProfilePagePropsType = {
  isAuthUser: boolean;
};

export const Profile = ({ isAuthUser }: ProfilePagePropsType) => {
  const user = useContext(UserContext).user;

  const posts: MessageType[] = [];
  const addNewPost = () => {};

  return (
    <section className={s.profile}>
      <BackImg src={user?.photos?.large || null} />
      <ProfileContent
        posts={posts}
        addNewPost={addNewPost}
        isAuthUser={isAuthUser}
      />
    </section>
  );
};
