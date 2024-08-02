// @flow
import * as React from 'react';
import {FindUserItem} from "../../components/FindUserItem/FindUserItem";
import s from './FindUsers.module.css'
import {Button} from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../store/store";
import {followUserAC, searchUsersAC, showMoreUsersAC, unfollowUserAC} from "../../reducers/usersReducer";
import {ChangeEvent, useEffect, useState, KeyboardEvent} from "react";
import {socialAPI, UserType} from "../../api/socialAPI";
import {SearchForm} from "../../components/SearchForm/SearchForm";



type Props = {

};
export const FindUsers = (props: Props) => {
  const users = useSelector<AppRootType, UserType[]>(state => state.users)
  const dispatch = useDispatch();

  const [currentUserPage, setCurrentUserPage] = useState<number>(1);
  const [currentUsers, setCurrentUsers] = useState<UserType[]>([])

  const showMoreUsers = () => {
    setCurrentUserPage(prev => prev + 1)
    dispatch(showMoreUsersAC(currentUsers))
  }

  const followUser = (userId: number) => {
    socialAPI.followUser(userId)
      .then(data => dispatch(followUserAC(userId)))
  }

  const unfollowUser = (userId: number) => {
    socialAPI.unfollowUser(userId)
      .then(data => dispatch(unfollowUserAC(userId)))
  }

  useEffect(() => {
    socialAPI.getUsers(currentUserPage)
      .then(data => data.items)
      .then(items => {
        dispatch(showMoreUsersAC(items))
        setCurrentUserPage(prev => prev + 1)
      })
  }, []);

  useEffect(() => {
    socialAPI.getUsers(currentUserPage)
      .then(data => data.items)
      .then(items => setCurrentUsers(items))
  }, [currentUserPage]);



  const onClickSearchBtn = (title: string) => {
      setCurrentUserPage(1)
      socialAPI.searchUsers(title)
        .then(data => data.items)
        .then(items => {
          dispatch(searchUsersAC(items))
        })

  }


  console.log(users);

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