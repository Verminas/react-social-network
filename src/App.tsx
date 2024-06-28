import React, {useState} from 'react';
import './App.css';
import {Header} from "./layout/Header/Header";
import {NavBar} from "./layout/NavBar/NavBar";
import {Profile} from "./layout/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./layout/Dialogs/Dialogs";
import {News} from "./layout/News/News";
import {Music} from "./layout/Music/Music";
import {Settings} from "./layout/Settings/Settings";
import {MessageItemsType, MessageType, StateDataType} from "./redux/stateData";
import {v1} from "uuid";

type AppPropsType = {
  stateData: StateDataType
}

function App({stateData: {postsData, profileInfoData, dialogsData, messagesData, sideBarFriendsData}}: AppPropsType) {
  const [messages, setMessages] = useState<MessageItemsType>(messagesData);
  const [posts, setPosts] = useState<MessageType[]>(postsData);

  const addNewMessage = (userID: string, message: string) => {
    const newMessage:MessageType = {
      userID: profileInfoData.id,
      messageID: v1(),
      name: profileInfoData.name,
      message,
      avatarSrc: profileInfoData.avatarSrc
    }

    setMessages({...messages, [userID]: [...messages[userID], newMessage]});
  }

  const addNewPost = (message: string) => {
    const newPost:MessageType = {
      userID: profileInfoData.id,
      messageID: v1(),
      name: profileInfoData.name,
      message,
      avatarSrc: profileInfoData.avatarSrc
    }

    setPosts([newPost, ...posts]);
  }

  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Routes>
          <Route index element={<Profile profileInfo={profileInfoData}
                                         posts={posts}
                                         addNewPost={addNewPost}
          />}></Route>
          <Route path={'/profile'}  element={<Profile profileInfo={profileInfoData}
                                                      posts={posts}
                                                      addNewPost={addNewPost}
          />}></Route>
          <Route path={'/dialogs/*'} element={<Dialogs dialogs={dialogsData}
                                                       addNewMessage={addNewMessage}
                                                       messages={messages}
                                                       userID={profileInfoData.id}
          />}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;