import { MouseEvent } from "react";
import { PATH } from "common/router/router";
import { UserOutlined } from "@ant-design/icons";
import { getLastSeenStatus } from "common/utils/getLastSeenStatus";
import { Link, useNavigate } from "react-router-dom";
import { GetDialogResponseType } from "features/SocialNetwork/api/socialAPI";
import { S } from "./DialogItem.styles";

type Props = {
  dialog: GetDialogResponseType;
};

export const DialogItem = ({ dialog }: Props) => {
  const {id, photos, lastUserActivityDate, userName, newMessagesCount, hasNewMessages} = dialog
  const navigate = useNavigate();

  const onAvatarUserClick = (
    e?: MouseEvent<HTMLElement, globalThis.MouseEvent> | undefined
  ) => {
    e?.preventDefault();
    navigate(`${PATH.PROFILE}/${id}`);
  };

  return (
    <Link
      to={`${PATH.DIALOGS}/${id}`}
    >
      <S.StyledBadge
        count={hasNewMessages ? newMessagesCount : 0}
        overflowCount={10}
      >
        <S.StyledCard
          isnewmessages={hasNewMessages.toString() || undefined}
        >
          <S.StyledCardMeta
            avatar={
              <S.StyledAvatar
                icon={<UserOutlined />}
                src={photos.small || null}
                alt={"profile-photo"}
                onClick={onAvatarUserClick}
              />
            }
            title={userName}
            description={
                <p>
                  Last activity:{" "}
                  {getLastSeenStatus(lastUserActivityDate)}
                </p>
            }
          />
        </S.StyledCard>
      </S.StyledBadge>
    </Link>
  );
};