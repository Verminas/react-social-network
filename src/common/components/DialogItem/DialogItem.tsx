// @flow
import * as React from "react";
import s from "common/components/FindUserItem/FindUserItem.module.css";
import { PATH } from "common/router/router";
import { Avatar, Badge, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getLastSeenStatus } from "common/utils/getLastSeenStatus";
import { Link, useNavigate } from "react-router-dom";
import { GetDialogResponseType } from "features/SocialNetwork/api/socialAPI";
import { MouseEvent } from "react";

type Props = {
  dialog: GetDialogResponseType;
};
export const DialogItem = ({ dialog }: Props) => {
  const navigate = useNavigate();
  const onAvatarUserClick = (
    e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent> | undefined,
  ) => {
    e?.preventDefault();
    navigate(`${PATH.PROFILE}/${dialog.id}`);
  };

  return (
    <Link
      className={s.wrapper}
      to={`${PATH.DIALOGS}/${dialog.id}`}
      style={{ width: "fit-content" }}
    >
      <Badge
        count={dialog.hasNewMessages ? dialog.newMessagesCount : 0}
        overflowCount={10}
      >
        <Card
          style={{
            minWidth: 200,
            maxWidth: 600,
            width: "100%",
            backgroundColor: dialog.hasNewMessages
              ? "rgba(22,119,255,0.5)"
              : "",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar
                size={86}
                icon={<UserOutlined />}
                src={dialog.photos.small || null}
                alt={"profile-photo"}
                onClick={onAvatarUserClick}
              />
            }
            title={dialog.userName}
            description={
              <>
                <p>
                  Last activity:{" "}
                  {getLastSeenStatus(dialog.lastUserActivityDate)}
                </p>
              </>
            }
          />
        </Card>
      </Badge>
    </Link>
  );
};
