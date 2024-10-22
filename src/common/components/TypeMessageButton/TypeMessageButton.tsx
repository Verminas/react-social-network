// @flow
import * as React from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { MouseEvent } from "react";
import { dialogsActions } from "features/SocialNetwork/model/dialogsSlice";
import { PATH } from "common/router/router";
import { useAppDispatch } from "app/store";
import { useNavigate } from "react-router-dom";

type Props = {
  userId: number;
};
export const TypeMessageButton = ({ userId }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onClickHandlerDialog = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(dialogsActions.startDialog(userId))
      .unwrap()
      .then(() => {
        navigation(`${PATH.DIALOGS}/${userId}`);
      })
      .catch(console.error);
  };

  return (
    <Button
      type="primary"
      icon={<MessageOutlined />}
      iconPosition={"end"}
      onClick={onClickHandlerDialog}
      style={{ marginTop: "10px", marginLeft: "10px" }}
    >
      Type message
    </Button>
  );
};
