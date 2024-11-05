import { MessageOutlined } from "@ant-design/icons";
import { MouseEvent } from "react";
import { dialogsActions } from "features/SocialNetwork/model/dialogsSlice";
import { PATH } from "common/router/router";
import { useAppDispatch } from "app/store";
import { useNavigate } from "react-router-dom";
import {S} from "common/styles/Card.styles"

type Props = {
  userId: number;
};
export const TypeMessageButton = ({ userId }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onStartDialog = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(dialogsActions.startDialog(userId))
      .unwrap()
      .then(() => {
        navigation(`${PATH.DIALOGS}/${userId}`);
      })
      .catch(console.error);
  };

  return (
    <S.StyledButton
      type="primary"
      icon={<MessageOutlined />}
      iconPosition={"end"}
      onClick={onStartDialog}
    >
      Type message
    </S.StyledButton>
  );
};
