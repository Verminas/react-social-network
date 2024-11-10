import { FindUserItem } from "common/components/FindUserItem/FindUserItem";
import { SearchForm } from "common/components/SearchForm/SearchForm";
import { Empty, Pagination, Statistic } from "antd";
import { S } from "./FindUsers.styles";
import { useFindUsers } from "../../../lib/useFindUsers";

export const FindUsers = () => {
  const {
    users,
    usersTotalCount,
    status,
    followUnfollowUser,
    isTabletWidth,
    currentPage,
    onClickSearchBtn,
    onChangePagination
  } = useFindUsers();

  const usersElements = users.map((u) => (
    <FindUserItem
      key={u.id}
      user={u}
      onClickBtn={followUnfollowUser(u.followed)}
      loading={status === "loading"}
    />
  ));

  return (
    <S.Wrapper>
      <Statistic title="Active Users" value={usersTotalCount} />
      <SearchForm onClickBtn={onClickSearchBtn} />
      <Pagination
        total={usersTotalCount}
        onChange={onChangePagination}
        current={currentPage}
        simple={isTabletWidth && { readOnly: true }}
      />
      <S.WrapperItems>
        {users.length ? usersElements : <Empty description={"Users not found :("} />}
      </S.WrapperItems>
    </S.Wrapper>
  );
};
