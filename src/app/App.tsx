import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../layout/Header/Header";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAppDispatch} from "./store";
import {selectAppIsInitialized} from "./reducers/appSlice";
import {Progress} from "../components/Progress/Progress";
import {authActions} from "./reducers/authSlice";


export function App() {
  debugger
  const dispatch = useAppDispatch();
  const  isInitialized= useSelector(selectAppIsInitialized);

  useEffect(() => {
    dispatch(authActions.initializeApp())
  }, []);

  if(!isInitialized) {
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