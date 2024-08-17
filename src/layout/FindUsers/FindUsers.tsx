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
  const [currentUserPage, setCurrentUserPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number | undefined>(1);
  const [paginationButtons, setPaginationButtons] = useState<number[]>([1]);


  const countUsersForFetching = 10;

  const showMoreUsers = () => {
    dispatch(showMoreUsersTC(currentUserPage + 1))
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
      .then(usersCount => {
        if (usersCount) {
          setPagesCount(Math.ceil(usersCount / countUsersForFetching))
        }
      })
  }, []);

  useEffect(() => {
    dispatch(fetchUsersTC(currentUserPage))

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
    dispatch(searchUsersTC(title))
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