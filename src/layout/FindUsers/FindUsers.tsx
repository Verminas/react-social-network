// @flow
import * as React from 'react';
import {FindUserItem} from "../../components/FindUserItem/FindUserItem";
import s from './FindUsers.module.css'
import {Button} from "../../components/Button/Button";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/store";
import {useEffect, useState} from "react";
import {SearchForm} from "../../components/SearchForm/SearchForm";
import {selectUsers, selectUsersTotalCount, usersActions} from "../../app/reducers/usersSlice";


type Props = {};
export const FindUsers = (props: Props) => {
  const users = useSelector(selectUsers)
  const usersTotalCount = useSelector(selectUsersTotalCount)
  const dispatch = useAppDispatch();
  const [currentUserPage, setCurrentUserPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number | undefined>(1);
  const [paginationButtons, setPaginationButtons] = useState<number[]>([1]);


  const countUsersForFetching = 10;

  const showMoreUsers = () => {
    dispatch(usersActions.showMoreUsers(currentUserPage + 1))
    setCurrentUserPage(prev => prev + 1)
  }

  const followUser = (userId: number) => {
    dispatch(usersActions.followUser(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(usersActions.unfollowUser(userId))
  }

  useEffect(() => {
    dispatch(usersActions.fetchUsers(currentUserPage))
      .then(() => {
        if (usersTotalCount) {
          setPagesCount(Math.ceil(usersTotalCount / countUsersForFetching))
        }
      })
  }, []);

  useEffect(() => {
    dispatch(usersActions.fetchUsers(currentUserPage))

    if(currentUserPage > 2 && (pagesCount && currentUserPage < pagesCount - 1)) {
      setPaginationButtons([currentUserPage - 1, currentUserPage, currentUserPage + 1])
    } else {
      if(currentUserPage <= 2) {
        setPaginationButtons([1, 2, 3])
      }
      if(pagesCount && currentUserPage >= pagesCount - 1) {
        setPaginationButtons([pagesCount - 1])
      }
    }
  }, [currentUserPage]);

  useEffect(() => {
    if(pagesCount && pagesCount > 1) {
      if(pagesCount > 3) {
        setPaginationButtons([1, 2, 3])
      }
    }
  }, [pagesCount]);


  const onClickSearchBtn = (title: string) => {
    dispatch(usersActions.searchUsers(title))
    setCurrentUserPage(1)
  }

  const paginationButtonHandler = (page: number) => {
    setCurrentUserPage(page)
  }
  const paginationButtonBackHandler = () => {
    setCurrentUserPage(prev => prev - 1)
  }
  const paginationButtonNextHandler = () => {
    setCurrentUserPage(prev => prev + 1)
  }

  return (
    <div className={s.wrapper}>
      <h3>Users</h3>
      <SearchForm onClickBtn={onClickSearchBtn}/>
      <div>
        <div>Count of future pagination buttons: {pagesCount ? pagesCount : 'Loading'}</div>
        <div>
          <button disabled={currentUserPage === 1} onClick={paginationButtonBackHandler}>{'<'}</button>
          {currentUserPage > 2
            ?
            <>
              <button onClick={() => paginationButtonHandler(1)}>1</button>
              <span>...</span>
            </>
            : null
          }
          {paginationButtons.map(b => <button onClick={() => paginationButtonHandler(b)} style={b === currentUserPage ? {background: 'lightblue'} : {}}>{b}</button>)}
          {currentUserPage < (pagesCount as number) - 2 ? '...' : null}
          <button onClick={() => paginationButtonHandler(pagesCount ? pagesCount : 1)} style={pagesCount === currentUserPage ? {background: 'lightblue'} : {}} >{pagesCount}</button>
          <button disabled={currentUserPage === pagesCount} onClick={paginationButtonNextHandler}>{'>'}</button>
        </div>
      </div>
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