import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";

function App() {
  return (
    <div className="app-wrapper">
      <Header className={'header'}/>
      <NavBar className={'navBar'}/>
      <Profile className={'profile'}/>
    </div>
  );
}

export default App;