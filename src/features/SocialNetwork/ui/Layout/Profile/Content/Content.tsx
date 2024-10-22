// @flow
import * as React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadFile } from "common/components/UploadFile/UploadFile";
import { Info } from "features/SocialNetwork/ui/Layout/Profile/Content/Info/Info";
import { useContext } from "react";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";
import { TypeMessageButton } from "common/components/TypeMessageButton/TypeMessageButton";

type Props = {};
export const Content = (props: Props) => {
  const { user, isAuthUser } = useContext(UserContext);
  return (
    <div
      style={{ display: "flex", gap: "15px", justifyContent: "space-evenly" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <Avatar
            size={200}
            icon={<UserOutlined />}
            src={user?.photos?.small || null}
            alt={"profile-photo"}
          />
          {user.lookingForAJob ? (
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1677FF",
                color: "white",
                padding: "5px 10px",
                borderRadius: "20px",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              }}
            >
              #OPENTOWORK
            </div>
          ) : (
            ""
          )}
        </div>
        {isAuthUser ? (
          <UploadFile />
        ) : (
          <TypeMessageButton userId={user.userId} />
        )}
      </div>
      <Info />
    </div>
  );
};
