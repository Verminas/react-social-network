import { UserType } from "features/SocialNetwork/api/socialAPI";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { TypeMessageButton } from "common/components/TypeMessageButton/TypeMessageButton";
import { FOLLOW_TEXT, UNFOLLOW_TEXT, YOU_FOLLOW, YOU_UNFOLLOW } from "common/constants/common";
import {S} from "./FindUserItem.styles"
import { PATH } from "common/router/router";

type Props = {
  user: UserType;
  onClickBtn: (userId: number) => void;
  loading: boolean;
};

export const FindUserItem = ({ user, onClickBtn, loading }: Props) => {
  const {id, name, photos, followed} = user

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickBtn(id);
  };

  return (
    <Link key={user.id} to={`${PATH.PROFILE}/${id}`}>
      <S.StyledCard
        loading={loading}
      >
        <S.StyledCardMeta
          avatar={
            <S.StyledAvatar
              icon={<UserOutlined />}
              src={photos.small || null}
              alt={"profile-photo"}
            />
          }
          title={name}
          description={
            <>
              <p>
                {user.followed
                  ? `${YOU_FOLLOW} ${name}`
                  : `${YOU_UNFOLLOW} ${name}`}
              </p>
              <S.ButtonsWrapper>
                <S.StyledButton
                  type="primary"
                  icon={<UserAddOutlined />}
                  iconPosition={"end"}
                  onClick={onClickHandler}
                >
                  {followed ? UNFOLLOW_TEXT : FOLLOW_TEXT}
                </S.StyledButton>

                <TypeMessageButton userId={id} />
              </S.ButtonsWrapper>
            </>
          }
        />
      </S.StyledCard>
    </Link>
  );
};
