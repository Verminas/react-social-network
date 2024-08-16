import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {Dialogs} from "../../layout/Dialogs/Dialogs";
import {News} from "../../layout/News/News";
import {Music} from "../../layout/Music/Music";
import {Settings} from "../../layout/Settings/Settings";
import {FindUsers} from "../../layout/FindUsers/FindUsers";
import {UserProfile} from "../../components/UserProfile/UserProfile";
import {ErrorPage} from "../../layout/ErrorPage/ErrorPage";
import React, {useEffect} from "react";
import {NavBar} from "../../layout/NavBar/NavBar";
import {stateData} from "../../redux/stateData";
import {useSelector} from "react-redux";
import {selectAppState, selectCurrentUser, selectMessages} from "../../app/selectors";
import {addNewMessageAC} from "../../app/reducers/messagesReducer";
import {useAppDispatch} from "../../app/store";
import {Progress} from "../../components/Progress/Progress";
import {PATH} from "../../router/router";

export const SocialNetwork = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const app = useSelector(selectAppState);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if(currentUser.userId) {
      navigate(`/profile/${currentUser.userId}`)
    }
  }, [currentUser.userId]);

  // if(!app.isAuthorized) {
  //   alert('redirect for login')
  //   navigate(PATH.LOGIN)
  // }

  return (
    <>
      <NavBar sideBar={stateData.sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Outlet/>
        {/* с вариантом ниже - бесконечный цикл с выводом в консоль*/}
        {/*{appStatus === 'loading' ? <Progress/>: <Outlet/>}*/}


        {/*<Routes>*/}

        {/*  <Route path={'/'} element={<Navigate to={`/profile`}/>}></Route>*/}
        {/*  <Route path={'/dialogs/'} element={<Navigate to={'/dialogs/1'}/>}></Route>*/}
        {/*  <Route path={'/dialogs/:userId'} element={<Dialogs dialogs={stateData.dialogsData}*/}
        {/*                                                     addNewMessage={addNewMessage}*/}
        {/*                                                     messages={messages}*/}
        {/*                                                     userID={1}/>}></Route>*/}
        {/*  <Route path={'/news'} element={<News/>}></Route>*/}
        {/*  <Route path={'/music'} element={<Music/>}></Route>*/}
        {/*  <Route path={'/settings'} element={<Settings/>}></Route>*/}
        {/*  <Route path={'/users'} element={<FindUsers/>}></Route>*/}

        {/*  <Route path={`/profile/:userId`} element={<UserProfile/>}></Route>*/}

        {/*  <Route path={'/*'} element={<Navigate to={'/error'}/>}></Route>*/}
        {/*  <Route path={'/error'} element={<ErrorPage/>}></Route>*/}
        {/*</Routes>*/}
      </div>
    </>
  )
}