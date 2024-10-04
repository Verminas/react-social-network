// @flow
import * as React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadFile } from "common/components/UploadFile/UploadFile";
import { Info } from "features/SocialNetwork/ui/Layout/Profile/Content/Info/Info";
import { useContext } from "react";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";

type Props = {};
export const Content = (props: Props) => {
  const { user, isAuthUser } = useContext(UserContext);
  return (
    <div style={{ display: "flex", gap: "15px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Avatar
          size={200}
          icon={<UserOutlined />}
          src={user?.photos?.small || null}
          alt={"profile-photo"}
        />
        {isAuthUser ? <UploadFile /> : ""}
      </div>
      <Info />
    </div>
  );
};
