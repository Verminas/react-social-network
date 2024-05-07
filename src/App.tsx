import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";

type AppPropsType = {
  stateData: {
    profilePage: {
      postItemsData: Array<{
        id: string,
        postMessage: string,
      }>
    },
    messagesPage: {
      dialogItemsData: Array<{
        id: string,
        name: string,
      }>,
      messageItemsData: Array<{
        id: string,
        message: string,
      }>
    },
    newsPage: {},
    musicPage: {},
    settingsPage: {},
    sideBar: {
      friends: Array<{name: string}>
    }
  }
}

function App(props: AppPropsType) {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={props.stateData.sideBar}/>
      <div className="app-wrapper-content">
        <Routes>
          <Route index element={<Profile profilePage={props.stateData.profilePage}/>}></Route>
          <Route path={'/profile'}  element={<Profile profilePage={props.stateData.profilePage}/>}></Route>
          <Route path={'/dialogs/*'} element={<Dialogs messagesPage={props.stateData.messagesPage} />}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;