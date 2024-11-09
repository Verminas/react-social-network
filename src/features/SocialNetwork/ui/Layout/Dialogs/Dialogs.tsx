import Spinner from "common/components/Spinner/Spinner";
import { DialogItem } from "common/components/DialogItem/DialogItem";
import { useDialogs } from "features/SocialNetwork/lib/useDialogs";
import { MessageOutlined } from "@ant-design/icons";
import {  Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/router/router";
import { S } from "./Dialogs.styles";

export const Dialogs = () => {
  const { dialogs, status } = useDialogs();
  const navigate = useNavigate();

  if (status === "loading") {
    return <Spinner />;
  }

  const onNavigateUsers = () => {
    navigate(PATH.USERS);
  };

  const dialogItems = dialogs.length ? (dialogs.map((dialog) => <DialogItem dialog={dialog} key={dialog.id} />)) : (
    <S.EmptyWrapper>
      <Empty description={"There are not dialogs :("} />
      <S.StyledButton
        type="primary"
        icon={<MessageOutlined />}
        iconPosition={"end"}
        onClick={onNavigateUsers}
      >
        Find someone to start dialog
      </S.StyledButton>
    </S.EmptyWrapper>)
  ;
  return <S.DialogsWrapper>{dialogItems}</S.DialogsWrapper>;
};
