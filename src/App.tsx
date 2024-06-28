import React from 'react';
import './App.css';
import {Header} from "./layout/Header/Header";
import {NavBar} from "./layout/NavBar/NavBar";
import {Profile} from "./layout/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./layout/Dialogs/Dialogs";
import {News} from "./layout/News/News";
import {Music} from "./layout/Music/Music";
import {Settings} from "./layout/Settings/Settings";
import {StateDataType} from "./redux/stateData";

type AppPropsType = {
  stateData: StateDataType
}

function App({stateData: {profilePage, messagesPage, sideBar}}: AppPropsType) {
  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBar}/>
      <div className="app-wrapper-content">
        <Routes>
          <Route index element={<Profile profilePage={profilePage}/>}></Route>
          <Route path={'/profile'}  element={<Profile profilePage={profilePage}/>}></Route>
          <Route path={'/dialogs/*'} element={<Dialogs messagesPage={messagesPage} />}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;