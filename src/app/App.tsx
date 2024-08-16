import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../layout/Header/Header";
import {NavBar} from "../layout/NavBar/NavBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Dialogs} from "../layout/Dialogs/Dialogs";
import {News} from "../layout/News/News";
import {Music} from "../layout/Music/Music";
import {Settings} from "../layout/Settings/Settings";
import { StateDataType} from "../redux/stateData";
import {useSelector} from "react-redux";
import { useAppDispatch} from "./store";
import {addNewMessageAC} from "./reducers/messagesReducer";
import {ErrorPage} from "../layout/ErrorPage/ErrorPage";
import {FindUsers} from "../layout/FindUsers/FindUsers";
import {UserProfile} from "../components/UserProfile/UserProfile";
import {selectMessages} from "./selectors";
import {isAuthorizedAppTC} from "./reducers/appReducer";

type AppPropsType = {
  stateData: StateDataType
}

function App({stateData: {dialogsData, sideBarFriendsData}}: AppPropsType) {
  const messages = useSelector(selectMessages)
  const dispatch = useAppDispatch();

  const addNewMessage = (userID: number, message: string) => {
    dispatch(addNewMessageAC(userID, message))
  }

  useEffect(() => {
    dispatch(isAuthorizedAppTC())
  }, []);

  return (
    <div className="app-wrapper">
      <Header/>
      <NavBar sideBar={sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Routes>

          <Route path={'/'} element={<Navigate to={`/profile`}/>}></Route>
          <Route path={'/dialogs/'} element={<Navigate to={'/dialogs/1'}/>}></Route>
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