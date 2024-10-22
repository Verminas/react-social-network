// @flow
import * as React from "react";
import s from "common/components/FindUserItem/FindUserItem.module.css";
import { UserType } from "features/SocialNetwork/api/socialAPI";
import { Link } from "react-router-dom";
import { MouseEvent, useContext } from "react";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

import { Avatar, Card, Button } from "antd";
import { TypeMessageButton } from "common/components/TypeMessageButton/TypeMessageButton";
import { WindowWidthContext } from "app/App";
import styled from "styled-components";

type Props = {
  user: UserType;
  onClickBtn: (userId: number) => void;
  loading: boolean;
};

const followText = "Follow";
const unfollowText = "Unfollow";

export const FindUserItem = ({ user, onClickBtn, loading }: Props) => {
  const { isTabletWidth } = useContext(WindowWidthContext);

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickBtn(user.id);
  };

  return (
    <Link key={user.id} className={s.wrapper} to={`/profile/${user.id}`}>
      <StyledCard
        loading={loading}
        // style={{ minWidth: isTabletWidth ? 150 : 300 }}
      >
        <Card.Meta
          avatar={
            <Avatar
              size={isTabletWidth ? 40 : 86}
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
            </>
          }
        />
      </StyledCard>
    </Link>
  );
};

const StyledCard = styled(Card)`
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 150px;
    & div:first-child {
      padding: 10px;
    }
  }
`;
