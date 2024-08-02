// @flow
import * as React from 'react';
import {Avatar} from "../Avatar/Avatar";
import {Button} from "../Button/Button";
import s from './FindUserItem.module.css'
import defaultAvatar from '../../assets/image/no-avatar.png'
import {UserType} from "../../api/socialAPI";

type Props = {
  user: UserType
  onClick: (userId: number) => void
};

const followText = 'Follow'
const unfollowText = 'Unfollow'

export const FindUserItem = ({user, onClick}: Props) => {
  const onClickHandler = () => {
    onClick(user.id)
  }
  return (
    <div key={user.id} className={s.wrapper}>
      <div className={s.avatarBtn}>
        <Avatar src={user.photos.small || defaultAvatar}/>
        <Button onClick={onClickHandler}>{user.followed ? unfollowText : followText}</Button>
      </div>
      <div className={s.userInfo}>
        <div className={s.nameStatus}>
          <span>{user.name}, {user.id}</span>
          <span className={s.status}>{user.status}</span>
          <span>{user.followed ? 'true' : 'false'}</span>
        </div>
      </div>
    </div>
  );
};