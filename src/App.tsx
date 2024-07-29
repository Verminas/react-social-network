import React from 'react';
import './App.css';
import {Header} from "./layout/Header/Header";
import {NavBar} from "./layout/NavBar/NavBar";
import {Profile} from "./layout/Profile/Profile";
import {Navigate, Route, Routes} from "react-router-dom";
import {Dialogs} from "./layout/Dialogs/Dialogs";
import {News} from "./layout/News/News";
import {Music} from "./layout/Music/Music";
import {Settings} from "./layout/Settings/Settings";
import {MessageItemsType, MessageType, StateDataType} from "./redux/stateData";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./store/store";
import {addNewMessageAC} from "./reducers/messagesReducer";
import {addNewPostAC} from "./reducers/postsReducer";
import {ErrorPage} from "./layout/ErrorPage/ErrorPage";
import {FindUsers} from "./layout/FindUsers/FindUsers";

type AppPropsType = {
  stateData: StateDataType
}

function App({stateData: {profileInfoData, dialogsData, sideBarFriendsData}}: AppPropsType) {

  const messages = useSelector<AppRootType, MessageItemsType>(state => state.messages)
  const posts = useSelector<AppRootType, MessageType[]>(state => state.posts)
  const dispatch = useDispatch();

  const addNewMessage = (userID: string, message: string) => {
    dispatch(addNewMessageAC(userID, message))
  }

  const addNewPost = (post: string) => {
    dispatch(addNewPostAC(post))
  }



  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Routes>

          <Route path={'/'} element={<Navigate to={'/profile'}/>}></Route>
          <Route path={'/dialogs/'} element={<Navigate to={'/dialogs/1'}/>}></Route>
          <Route path={'/profile'}  element={<Profile profileInfo={profileInfoData}
                                                      posts={posts}
                                                      addNewPost={addNewPost}/>}></Route>
          <Route path={'/dialogs/:userId'} element={<Dialogs dialogs={dialogsData}
                                                       addNewMessage={addNewMessage}
                                                       messages={messages}
                                                       userID={profileInfoData.id}/>}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
          <Route path={'/find'} element={<FindUsers/>}></Route>

          <Route path={'/*'} element={<Navigate to={'/error'}/>}></Route>
          <Route path={'/error'} element={<ErrorPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;