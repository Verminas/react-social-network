// @flow
import * as React from 'react';
import {FindUserItem} from "../../components/FindUserItem/FindUserItem";
import s from './FindUsers.module.css'
import {Button} from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../store/store";
import {followUnfollowUserAC, showMoreUsersAC, UserType} from "../../reducers/usersReducer";
import {useEffect} from "react";
import axios from "axios";

const exampleData = [
  {
    userId: 'sdfgudsfgvhjnk',
    name: 'User 4',
    country: 'aksjdwe',
    city: 'Bsdfwrest',
    status: 'I would like to find new friends',
    avatarSrc: null,
    isFollowed: false
  },
  {
    userId: 'sdfgu1drftgyhujik xdcfgyhujiko',
    name: 'User 5',
    country: 'Poland',
    city: 'Krakow',
    status: 'I would like to find new friends',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/253',
    isFollowed: true
  },
  {
    userId: 'sdfgu2dfcgvbhjnk dfgyhujik xdcfvghjk',
    name: 'User 6',
    country: 'Poland',
    city: 'Krakow',
    status: 'I would like to find new friends',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/250',
    isFollowed: true
  },
]



type Props = {

};
export const FindUsers = (props: Props) => {
  const users = useSelector<AppRootType, UserType[]>(state => state.users)
  const dispatch = useDispatch();

  const showMoreUsers = () => {
    dispatch(showMoreUsersAC(exampleData))
  }

  const followUnfollowUser = (userId: string, isFollowed: boolean) => {
    dispatch(followUnfollowUserAC(userId, isFollowed))
  }

  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then(data => console.log(data.data))
      .catch(err => console.log(err))
  }, []);


  return (
    <div className={s.wrapper}>
      <h3>Users</h3>
      <div>
        {users.map(u => <FindUserItem user={u} onClick={followUnfollowUser}/>)}
      </div>
      <Button onClick={showMoreUsers}>Show more</Button>
    </div>
  );
};