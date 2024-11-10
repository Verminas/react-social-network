import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PATH } from "common/router/router";
import { S } from "./PostItem.styles";
import { Post } from "../../../../../model/postsSlice";
import {
  LikeOutlined
} from '@ant-design/icons';

type Props = {
  post: Post;
  onClick: (arg: {messageId: string, senderId: number}) => void;
  isMyPost: boolean;
};
export const PostItem = ({
                             post, onClick, isMyPost
                            }: Props) => {
  const { text, senderId, likes, photo, fullName , messageId } = post;

  const onDeleteHandler = () => {
    onClick({messageId, senderId});
  };

  return (
    <S.StyledCard
      id={messageId}
      ismymessage={isMyPost.toString() || undefined}
    >
      <S.StyledCardMeta
        avatar={
          <Link to={`${PATH.PROFILE}/${senderId}`}>
            <S.StyledAvatar
              icon={<UserOutlined />}
              src={photo || null}
              alt={"profile-photo"}
            />
          </Link>
        }
        title={fullName}
        description={
          <>
            <p>{text}</p>
            <S.StyledButton
              type="text"
              icon={<DeleteOutlined />}
              onClick={onDeleteHandler}
            />
            <S.StyledLikes><LikeOutlined  /> {likes}</S.StyledLikes>
          </>
        }
      />
    </S.StyledCard>
  );
};
