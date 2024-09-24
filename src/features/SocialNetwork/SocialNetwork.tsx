import {Navigate, Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {NavBar} from "../../layout/NavBar/NavBar";
import {stateData} from "../../redux/stateData";
import {useSelector} from "react-redux";
import {PATH} from "../../router/router";
import {selectCurrentUser} from "../../app/reducers/currentUserSlice";
import {selectIsLoggedIn} from "../../app/reducers/authSlice";

export const SocialNetwork = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if(currentUser.userId) {
      navigate(`${PATH.PROFILE}/${currentUser.userId}`)
    }
  }, [currentUser.userId]);

  if(!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <>
      <NavBar sideBar={stateData.sideBarFriendsData}/>
      <div className="app-wrapper-content">
        <Outlet/>
      </div>
    </>
  )
}