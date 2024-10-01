// @flow
import * as React from "react";
import s from "./FindUserItem.module.css";
import { UserType } from "api/socialAPI";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

import { Avatar, Card, Button } from "antd";

type Props = {
  user: UserType;
  onClickBtn: (userId: number) => void;
  loading: boolean;
};

const followText = "Follow";
const unfollowText = "Unfollow";

export const FindUserItem = ({ user, onClickBtn, loading }: Props) => {
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickBtn(user.id);
  };

  return (
    <Link key={user.id} className={s.wrapper} to={`/profile/${user.id}`}>
      <Card loading={loading} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={
            <Avatar
              size={86}
              icon={<UserOutlined />}
              src={user.photos.small || null}
              alt={"profile-photo"}
            />
          }
          title={user.name}
          description={
            <>
              <p>
                {user.followed
                  ? `You follow ${user.name}`
                  : `You unfollow ${user.name}`}
              </p>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                iconPosition={"end"}
                onClick={onClickHandler}
                style={{ marginTop: "10px" }}
              >
                {user.followed ? unfollowText : followText}
              </Button>
            </>
          }
        />
      </Card>
    </Link>
  );
};
