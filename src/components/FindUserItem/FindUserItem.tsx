// @flow
import * as React from 'react';
import {Avatar} from "../Avatar/Avatar";
import {Button} from "../Button/Button";
import s from './FindUserItem.module.css'
import {UserType} from "../../api/socialAPI";
import {Link} from "react-router-dom";
import {MouseEvent} from "react";

type Props = {
  user: UserType
  onClickBtn: (userId: number) => void
};

const followText = 'Follow'
const unfollowText = 'Unfollow'

export const FindUserItem = ({user, onClickBtn}: Props) => {
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickBtn(user.id)
  }

  return (
    <Link key={user.id} className={s.wrapper} to={`/profile/${user.id}`}>
      <div className={s.avatarBtn}>
        <Avatar src={user.photos.small}/>
        <Button onClick={onClickHandler}>{user.followed ? unfollowText : followText}</Button>
      </div>
      <div className={s.userInfo}>
        <div className={s.nameStatus}>
          <span>{user.name}, {user.id}</span>
          <span className={s.status}>{user.status}</span>
          <span>{user.followed ? `You follow ${user.name}` : `You unfollow ${user.name}`}</span>
        </div>
      </div>
    </Link>
  );
};