// @flow
import * as React from "react";
import s from "common/components/FindUserItem/FindUserItem.module.css";
import { UserType } from "features/SocialNetwork/api/socialAPI";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import {
  UserAddOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Button } from "antd";
import { useAppDispatch } from "app/store";
import { dialogsActions } from "features/SocialNetwork/model/dialogsSlice";
import { PATH } from "common/router/router";
import { TypeMessageButton } from "common/components/TypeMessageButton/TypeMessageButton";

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

  // example for dialogs
  // const onClickHandlerDialog = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   dispatch(dialogsActions.startDialog(user.id))
  //     .unwrap()
  //     .then(() => {
  //       navigation(`${PATH.DIALOGS}/${user.id}`);
  //     })
  //     .catch(console.error);
  // };

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

              <TypeMessageButton userId={user.id} />

              {/*<Button*/}
              {/*  type="primary"*/}
              {/*  icon={<MessageOutlined />}*/}
              {/*  iconPosition={"end"}*/}
              {/*  onClick={onClickHandlerDialog}*/}
              {/*  style={{ marginTop: "10px", marginLeft: "10px" }}*/}
              {/*>*/}
              {/*  Type message*/}
              {/*</Button>*/}
            </>
          }
        />
      </Card>
    </Link>
  );
};
