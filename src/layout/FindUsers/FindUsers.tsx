// @flow
import * as React from 'react';
import {FindUserItem} from "../../components/FindUserItem/FindUserItem";
import s from './FindUsers.module.css'
import {Button} from "../../components/Button/Button";
import {useSelector} from "react-redux";
import {AppRootType, useAppDispatch} from "../../app/store";
import {
  fetchUsersTC,
  followUserTC,
  searchUsersTC,
  showMoreUsersAC,
  showMoreUsersTC,
  unfollowUserTC
} from "../../app/reducers/usersReducer";
import {ReactElement, useEffect, useState} from "react";
import {socialAPI, UserType} from "../../api/socialAPI";
import {SearchForm} from "../../components/SearchForm/SearchForm";
import {useParams} from "react-router-dom";
import {selectUsers} from "../../app/selectors";


type Props = {};
export const FindUsers = (props: Props) => {
  const users = useSelector(selectUsers)
  const dispatch = useAppDispatch();

  const [currentUserPage, setCurrentUserPage] = useState<number>(2);

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
    dispatch(fetchUsersTC())
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
        {users.length < 1
          ? <span>Users not found</span>
          : users.map(u => <FindUserItem key={u.id}
                                         user={u}
                                         onClickBtn={u.followed ? unfollowUser : followUser}
          />)}
      </div>
      <Button onClick={showMoreUsers}>Show more</Button>
    </div>
  );
};