import { useSelector } from "react-redux";
import { selectStatus, selectUsers, selectUsersTotalCount, usersActions } from "../model/usersSlice";
import { useAppDispatch } from "../../../app/store";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { theme } from "common/styles/theme";

export const useFindUsers = () => {
  const users = useSelector(selectUsers);
  const usersTotalCount = useSelector(selectUsersTotalCount);
  const status = useSelector(selectStatus);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isTabletWidth, setIsTabletWidth] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)


  const followUser = (userId: number) => {
    dispatch(usersActions.followUser(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(usersActions.unfollowUser(userId));
  };

  const followUnfollowUser = (followed: boolean) => {
    return followed ? unfollowUser : followUser
  }

  useEffect(() => {
    (window.innerWidth <= theme.media.tabletTs ) && setIsTabletWidth(true)
  }, []);

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

    setCurrentPage(Number(searchParams.get("page")) || 1)
    dispatch(usersActions.fetchUsers(params))
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

  return {users, usersTotalCount, status, followUnfollowUser, isTabletWidth, currentPage, onClickSearchBtn, onChangePagination}
}