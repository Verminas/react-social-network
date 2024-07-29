// @flow
import * as React from 'react';
import {Avatar} from "../Avatar/Avatar";
import {Button} from "../Button/Button";
import s from './FindUserItem.module.css'
import {UserType} from "../../reducers/usersReducer";
import defaultAvatar from '../../assets/image/no-avatar.png'

type Props = {
  user: UserType
  onClick: (userId: string, isFollowed: boolean) => void
};

const followText = 'Follow'
const unfollowText = 'Unfollow'

export const FindUserItem = ({user, onClick}: Props) => {
  const onClickHandler = () => {
    onClick(user.userId, user.isFollowed)
  }
  return (
    <div key={user.userId} className={s.wrapper}>
      <div className={s.avatarBtn}>
        <Avatar src={user.avatarSrc || defaultAvatar}/>
        <Button onClick={onClickHandler}>{user.isFollowed ? unfollowText : followText}</Button>
      </div>
      <div className={s.userInfo}>
        <div className={s.nameStatus}>
          <span>{user.name}</span>
          <span className={s.status}>{user.status}</span>
        </div>
        <div className={s.address}>
          <span>{user.country}</span>
          <span>{user.city}</span>
        </div>
      </div>
    </div>
  );
};