// @flow
import * as React from "react";
import { FindUserItem } from "components/FindUserItem/FindUserItem";
import s from "./FindUsers.module.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { SearchForm } from "components/SearchForm/SearchForm";
import {
  selectUsers,
  selectUsersTotalCount,
  usersActions,
} from "app/reducers/usersSlice";
import { Pagination } from 'antd';
import { useSearchParams } from "react-router-dom";

type Props = {};
export const FindUsers = (props: Props) => {
  const users = useSelector(selectUsers);
  const usersTotalCount = useSelector(selectUsersTotalCount);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const followUser = (userId: number) => {
    dispatch(usersActions.followUser(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(usersActions.unfollowUser(userId));
  };

  useEffect(() => {
    const params = {page: 1, count: 10}
    dispatch(usersActions.fetchUsers(params))
  }, []);

  useEffect(() => {
    const params = {page: Number(searchParams.get('page') || 1), count: Number(searchParams.get('count') || 10)}
    dispatch(usersActions.fetchUsers(params))
  }, [searchParams]);

  const onClickSearchBtn = (title: string) => {
    dispatch(usersActions.searchUsers(title));
    setSearchParams({page: '1', count: searchParams.get('count') || '10'});
  };

  const onChangePagination = (page: number, pageSize: number) => {
    console.log(page, pageSize)
    const isDefaultParams = page === 1 && pageSize === 10

    setSearchParams(isDefaultParams ? {} : {page: page.toString(), count: pageSize.toString()})
  }

  return (
    <div className={s.wrapper}>
      <h3>Users</h3>
      <SearchForm onClickBtn={onClickSearchBtn} />
      <Pagination total={usersTotalCount} onChange={onChangePagination} current={Number(searchParams.get('page'))} />;

      <div>
        {users.length < 1 ? (
          <span>Users not found</span>
        ) : (
          users.map((u) => (
            <FindUserItem
              key={u.id}
              user={u}
              onClickBtn={u.followed ? unfollowUser : followUser}
            />
          ))
        )}
      </div>
    </div>
  );
};
