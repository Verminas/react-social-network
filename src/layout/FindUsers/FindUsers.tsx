// @flow
import * as React from 'react';
import {FindUserItem} from "../../components/FindUserItem/FindUserItem";
import s from './FindUsers.module.css'
import {Button} from "../../components/Button/Button";
import {useSelector} from "react-redux";
import {AppRootType, useAppDispatch} from "../../store/store";
import {followUserTC, searchUsersTC, showMoreUsersTC, unfollowUserTC} from "../../reducers/usersReducer";
import {useEffect, useState} from "react";
import {UserType} from "../../api/socialAPI";
import {SearchForm} from "../../components/SearchForm/SearchForm";


type Props = {};
export const FindUsers = (props: Props) => {
  const users = useSelector<AppRootType, UserType[]>(state => state.users)
  const dispatch = useAppDispatch();

  const [currentUserPage, setCurrentUserPage] = useState<number>(1);

  const showMoreUsers = () => {
    dispatch(showMoreUsersTC(currentUserPage))
    setCurrentUserPage(prev => prev + 1)
  }

  const followUser = (userId: number) => {
    dispatch(followUserTC(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollowUserTC(userId))
  }

  useEffect(() => {
    showMoreUsers()
  }, []);


  const onClickSearchBtn = (title: string) => {
    dispatch(searchUsersTC(title))
    setCurrentUserPage(1)
  }


  return (
    <div className={s.wrapper}>
      <h3>Users</h3>
      <SearchForm onClickBtn={onClickSearchBtn}/>
      <div>
        {users.map(u => <FindUserItem user={u} onClick={u.followed ? unfollowUser : followUser}/>)}
      </div>
      <Button onClick={showMoreUsers}>Show more</Button>
    </div>
  );
};