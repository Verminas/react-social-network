import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";

type AppPropsType = {
  dialogItemsData: Array<{
    id: string,
    name: string,
  }>,
  messageItemsData: Array<{
    id: string,
    message: string,
  }>,
  postItemsData: Array<{
    id: string,
    postMessage: string,
  }>,
}

function App(props: AppPropsType) {
  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <Header/>
      <NavBar/>
      <div className="app-wrapper-content">
        <Routes>
          <Route path={'/profile'} element={<Profile postItemsData={props.postItemsData}/>}></Route>
          <Route path={'/dialogs/*'} element={<Dialogs dialogItemsData={props.dialogItemsData} messageItemsData={props.messageItemsData}/>}></Route>
          <Route path={'/news'} element={<News/>}></Route>
          <Route path={'/music'} element={<Music/>}></Route>
          <Route path={'/settings'} element={<Settings/>}></Route>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;