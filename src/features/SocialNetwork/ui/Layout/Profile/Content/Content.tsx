import { UserOutlined } from "@ant-design/icons";
import { UploadFile } from "common/components/UploadFile/UploadFile";
import { Info } from "features/SocialNetwork/ui/Layout/Profile/Content/Info/Info";
import { useContext } from "react";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";
import { TypeMessageButton } from "common/components/TypeMessageButton/TypeMessageButton";
import { GetUserProfileResponseType } from "../../../../api/socialAPI";
import { S } from "./Content.styles";


export const Content = () => {
  const { user, isAuthUser } = useContext(UserContext);
  const { userId, lookingForAJob } = user as GetUserProfileResponseType;

  return (
    <S.Wrapper>
      <S.WrapperPhotoButton>
        <S.WrapperPhoto>
          <S.StyledAvatar
            icon={<UserOutlined />}
            src={user?.photos.large || null}
            alt={"profile-photo"}
          />
          {lookingForAJob && <S.Label>#OPENTOWORK</S.Label>}
        </S.WrapperPhoto>
        {isAuthUser ? <UploadFile /> : <TypeMessageButton userId={userId} />}
      </S.WrapperPhotoButton>
      <Info />
    </S.Wrapper>
  );
};
