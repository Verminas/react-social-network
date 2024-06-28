// @flow
import * as React from 'react';
import s from "./Avatar.module.css";

type Props = {
  isProfileImg?: boolean | undefined
  src?: string
};
export const Avatar = ({isProfileImg, src}: Props) => {
  return (
    <img className={isProfileImg ? s.imgProfile : s.dialogLogo}
         src={src ? src : "https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"}
         alt="avatar"/>
  );
};