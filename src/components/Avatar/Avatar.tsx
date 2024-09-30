// @flow
import * as React from "react";
import s from "./Avatar.module.css";
import defaultAvatar from "../../assets/image/no-avatar.png";

type Props = {
  isProfileImg?: boolean | undefined;
  src?: string | null;
};
export const Avatar = ({ isProfileImg, src }: Props) => {
  return (
    <img
      className={isProfileImg ? s.imgProfile : s.dialogLogo}
      src={src ? src : defaultAvatar}
      alt="avatar"
    />
  );
};
