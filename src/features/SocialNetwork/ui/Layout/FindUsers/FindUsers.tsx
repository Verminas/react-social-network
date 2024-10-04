// @flow
import * as React from "react";
import { FindUserItem } from "common/components/FindUserItem/FindUserItem";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { SearchForm } from "common/components/SearchForm/SearchForm";
import {
  selectUsers,
  selectUsersTotalCount,
  usersActions,
} from "features/SocialNetwork/model/usersSlice";
import { Col, Pagination, Statistic } from "antd";
import { useSearchParams } from "react-router-dom";

type Props = {};
export const FindUsers = (props: Props) => {
  const users = useSelector(selectUsers);
  const usersTotalCount = useSelector(selectUsersTotalCount);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const followUser = (userId: number) => {
    dispatch(usersActions.followUser(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(usersActions.unfollowUser(userId));
  };

  useEffect(() => {
    const params = {
      page: Number(searchParams.get("page") || 1),
      count: Number(searchParams.get("count") || 10),
      term: searchParams.get("term") || "",
      friend:
        !searchParams.get("friend") || searchParams.get("friend") === "null"
          ? null
          : searchParams.get("friend") === "true",
    };
    setIsLoading(true);
    dispatch(usersActions.fetchUsers(params)).then(() => setIsLoading(false));
  }, [searchParams]);

  const onClickSearchBtn = (arg: { user: string; friend: boolean }) => {
    const { user, friend } = arg;
    setSearchParams({
      page: "1",
      count: searchParams.get("count") || "10",
      term: user || "",
      friend: friend ? "true" : "false",
    });
  };

  const onChangePagination = (page: number, pageSize: number) => {
    const isDefaultParams = page === 1 && pageSize === 10;

    setSearchParams(
      isDefaultParams
        ? {}
        : {
            page: page.toString(),
            count: pageSize.toString(),
            term: searchParams.get("term") || "",
            friend: searchParams.get("friend") || "null",
          },
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        padding: "15px 25px",
      }}
    >
      <Col span={12} style={{ marginBottom: "20px" }}>
        <Statistic title="Active Users" value={usersTotalCount} />
      </Col>
      <SearchForm onClickBtn={onClickSearchBtn} />
      <Pagination
        total={usersTotalCount}
        onChange={onChangePagination}
        current={Number(searchParams.get("page"))}
      />
      <div>
        {users.length < 1 ? (
          <span>Users not found</span>
        ) : (
          users.map((u) => (
            <FindUserItem
              key={u.id}
              user={u}
              onClickBtn={u.followed ? unfollowUser : followUser}
              loading={isLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};
