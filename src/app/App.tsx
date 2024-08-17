import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../layout/Header/Header";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./store";
import {selectAppState} from "./selectors";
import {isAuthorizedAppTC} from "./reducers/appReducer";
import {Progress} from "../components/Progress/Progress";


export function App() {
  const dispatch = useAppDispatch();
  const  isAuthorized= useSelector(selectAppState).isAuthorized;

  useEffect(() => {
    dispatch(isAuthorizedAppTC())
  }, []);

  if(!isAuthorized) {
    return <Progress/>
  }

  return (
    <div className="app-wrapper">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;