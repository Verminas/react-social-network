import React from "react";
import Spinner from "common/components/Spinner/Spinner";
import { DialogItem } from "common/components/DialogItem/DialogItem";
import { useDialogs } from "features/SocialNetwork/lib/useDialogs";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/router/router";

export const Dialogs = () => {
  const { dialogs, status } = useDialogs();
  const navigate = useNavigate();

  if (status === "loading") {
    return <Spinner />;
  }

  const onNavigateUsers = () => {
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
      <Empty description={"There are not dialogs :("} />
      <Button
        type="primary"
        icon={<MessageOutlined />}
        iconPosition={"end"}
        onClick={onNavigateUsers}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Find someone to start dialog
      </Button>
    </div>
  ) : (
    dialogs.map((dialog) => <DialogItem dialog={dialog} key={dialog.id} />)
  );
  return <div style={{ margin: "0 auto", display: 'flex', flexDirection: 'column', gap: 10 }}>{dialogItems}</div>;
};
