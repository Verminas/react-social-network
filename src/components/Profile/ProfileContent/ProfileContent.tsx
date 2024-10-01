import s from "./ProfileContent.module.css";
import React from "react";
import { ProfilePosts } from "../ProfilePosts/ProfilePosts";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { MessageType } from "redux/stateData";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { UploadFile } from "components/UploadFile/UploadFile";
import { useSelector } from "react-redux";
import { selectUser } from "app/reducers/usersSlice";

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
  const viewedUser = useSelector(selectUser);

  return (
    <div className={s.content}>
      <div className={s.wrapperCommon}>
        <div className={s.wrapperItem}>
          <Avatar
            size={200}
            icon={<UserOutlined />}
            src={viewedUser.photos?.small || null}
            alt={"profile-photo"}
          />
          {isAuthUser ? <UploadFile /> : ""}
        </div>
        <ProfileInfo user={viewedUser} />
      </div>
      <ProfilePosts
        posts={posts}
        addNewPost={addNewPost}
        userID={viewedUser.userId}
      />
    </div>
  );
};
