import React from "react";
import Spinner from "common/components/Spinner/Spinner";
import { DialogItem } from "common/components/DialogItem/DialogItem";
import { useDialogs } from "common/hooks/useDialogs";
import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/router/router";

export const Dialogs = () => {
  const { dialogs } = useDialogs();
  const navigate = useNavigate();

  if (!dialogs.length) {
    return <Spinner />;
  }

  const onNavigateHandler = () => {
    navigate(PATH.USERS);
  };

  const dialogItems = !dialogs.length ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      <p>There are not dialogs :(</p>
      <p>Find someone to start dialog..</p>
      <Button
        type="primary"
        icon={<MessageOutlined />}
        iconPosition={"end"}
        onClick={onNavigateHandler}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Find users
      </Button>
    </div>
  ) : (
    dialogs.map((dialog) => <DialogItem dialog={dialog} key={dialog.id} />)
  );
  return <div style={{ margin: "0 auto" }}>{dialogItems}</div>;
};
