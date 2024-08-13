import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./layout/Header/Header";
import {NavBar} from "./layout/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
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
import {UserProfile} from "./components/UserProfile/UserProfile";
import {GetUserProfileResponseType, socialAPI} from "./api/socialAPI";
import {getUserProfileAC} from "./reducers/currentUserReducer";

type AppPropsType = {
  stateData: StateDataType
}
export const myId = 31421;

function App({stateData: {dialogsData, sideBarFriendsData}}: AppPropsType) {

  const messages = useSelector<AppRootType, MessageItemsType>(state => state.messages)
  const posts = useSelector<AppRootType, MessageType[]>(state => state.posts)
  const currentUser = useSelector<AppRootType, GetUserProfileResponseType>(state => state.currentUser)
  const dispatch = useDispatch();

  const addNewMessage = (userID: number, message: string) => {
    dispatch(addNewMessageAC(userID, message))
  }

  const addNewPost = (post: string) => {
    dispatch(addNewPostAC(post))
  }

  useEffect(() => {
    socialAPI.authMe()
      .then(data => data.data)
      .then(data => socialAPI.getUserProfile(data.id))
      .then(user => dispatch(getUserProfileAC(user)));
  }, []);

  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Routes>

          <Route path={'/'} element={<Navigate to={`/profile`}/>}></Route>
          <Route path={'/dialogs/'} element={<Navigate to={'/dialogs/1'}/>}></Route>
          {/*<Route path={'/profile'} element={<Profile currentUser={currentUser} posts={posts} addNewPost={addNewPost} isAuthUser={currentUser.userId === myId}/>}></Route>*/}
          <Route path={'/dialogs/:userId'} element={<Dialogs dialogs={dialogsData}
                                                             addNewMessage={addNewMessage}
                                                             messages={messages}
                                                             userID={1}/>}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
          <Route path={'/users'} element={<FindUsers/>}></Route>

          <Route path={`/profile/:userId`} element={<UserProfile/>}></Route>

          <Route path={'/*'} element={<Navigate to={'/error'}/>}></Route>
          <Route path={'/error'} element={<ErrorPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;