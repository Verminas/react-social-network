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
import {MessageItemsData, MessageType, myUser, StateDataType} from "./redux/stateData";
import {v1} from "uuid";

type AppPropsType = {
  stateData: StateDataType
}

function App({stateData: {profilePage, messagesPage, sideBar}}: AppPropsType) {
  const [messages, setMessages] = useState<MessageItemsData>(messagesPage.messageItemsData);
  const [posts, setPosts] = useState<MessageType[]>(profilePage.postItemsData);

  const addNewMessage = (userID: string, message: string) => {
    const newMessage:MessageType = {
      userID: myUser.id,
      messageID: v1(),
      name: myUser.name,
      message,
      avatarSrc: myUser.avatarSrc
    }

    setMessages({...messages, [userID]: [...messages[userID], newMessage]});
  }

  const addNewPost = (message: string) => {
    const newPost:MessageType = {
      userID: myUser.id,
      messageID: v1(),
      name: myUser.name,
      message,
      avatarSrc: myUser.avatarSrc
    }

    setPosts([newPost, ...posts]);
  }

  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBar}/>
      <div className="app-wrapper-content">
        <Routes>
          <Route index element={<Profile profilePage={profilePage}
                                         posts={posts}
                                         addNewPost={addNewPost}
          />}></Route>
          <Route path={'/profile'}  element={<Profile profilePage={profilePage}
                                                      posts={posts}
                                                      addNewPost={addNewPost}
          />}></Route>
          <Route path={'/dialogs/*'} element={<Dialogs messagesPage={messagesPage}
                                                       addNewMessage={addNewMessage}
                                                       messages={messages}
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