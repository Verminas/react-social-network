import s from "common/components/Profile/ProfileContent/ProfileContent.module.css";
import React, { useContext } from "react";
import { ProfilePosts } from "common/components/Profile/ProfilePosts/ProfilePosts";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { MessageType } from "common/redux/stateData";
import { ProfileInfo } from "common/components/Profile/ProfileInfo/ProfileInfo";
import { UploadFile } from "common/components/UploadFile/UploadFile";
import { useSelector } from "react-redux";
import { selectUser } from "app/reducers/usersSlice";
import { selectCurrentUser } from "app/reducers/currentUserSlice";
import { UserContext } from "common/components/UserProfile/UserProfile";

type ProfileContentPropsType = {
  posts: MessageType[];
  addNewPost: (message: string) => void;
  isAuthUser: boolean;
};

export const ProfileContent = ({
  addNewPost,
  posts,
  isAuthUser,
}: ProfileContentPropsType) => {
  const user = useContext(UserContext).user;

  return (
    <div className={s.content}>
      <div className={s.wrapperCommon}>
        <div className={s.wrapperItem}>
          <Avatar
            size={200}
            icon={<UserOutlined />}
            src={user?.photos?.small || null}
            alt={"profile-photo"}
          />
          {isAuthUser ? <UploadFile /> : ""}
        </div>
        <ProfileInfo user={user} />
      </div>
      <ProfilePosts
        posts={posts}
        addNewPost={addNewPost}
        userID={user?.userId || 1}
      />
    </div>
  );
};
