import React, { useEffect, useState } from "react";
import { GetDialogsResponseType, socialAPI } from "api/socialAPI";
import Spinner from "components/Spinner/Spinner";
import s from "components/FindUserItem/FindUserItem.module.css";
import { Avatar, Button, Card } from "antd";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PATH } from "router/router";
import { getLastSeenStatus } from "utils/getLastSeenStatus";
import { useSelector } from "react-redux";
import { dialogsActions, selectDialogs } from "app/reducers/dialogsSlice";
import { useAppDispatch } from "app/store";

export const Dialogs = () => {
  const dialogs = useSelector(selectDialogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
  }, []);

  if (!dialogs.length) {
    return <Spinner />;
  }
  return (
    <div style={{ margin: "0 auto" }}>
      {!dialogs.length ? (
        <span>Nothing</span>
      ) : (
        dialogs.map((dialog) => (
          <Link
            key={dialog.id}
            className={s.wrapper}
            to={`${PATH.DIALOGS}/${dialog.id}`}
          >
            <Card
              style={{
                minWidth: 300,
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
                  />
                }
                title={dialog.userName}
                description={
                  <>
                    <p>
                      New message:{" "}
                      {dialog.hasNewMessages ? dialog.newMessagesCount : 0}
                    </p>
                    <p>
                      Last activity:{" "}
                      {getLastSeenStatus(dialog.lastUserActivityDate)}
                    </p>
                  </>
                }
              />
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};
