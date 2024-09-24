import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../app/store";
import React, {useEffect} from "react";
import s from "../ProfileContent/ProfileContent.module.css";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {GetUserProfileResponseType} from "../../../api/socialAPI";
import {selectCurrentUser} from "../../../app/reducers/currentUserSlice";
import {selectUserStatus, userStatusActions} from "../../../app/reducers/userStatusSlice";

const noInformation = 'no information';
type ProfileInfoPropsType = {
  user: GetUserProfileResponseType
}
export const ProfileInfo = ({user}: ProfileInfoPropsType) => {
  const {
    userId,
    lookingForAJobDescription,
    lookingForAJob,
    aboutMe,
    fullName,
    contacts
  } = user

  const currentUser = useSelector(selectCurrentUser)
  const status = useSelector(selectUserStatus)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userStatusActions.getUserStatus(userId))
  }, [userId]);

  const changeStatus = (title: string) => {
    dispatch(userStatusActions.updateUserStatus({title, userId}))
  }

  return (
    <div className={s.info} key={userId}>
      <h2>{fullName}</h2>
      <h3>My status: {userId === currentUser.userId
        ? <EditableSpan title={status || noInformation} editItem={changeStatus}/>
        : <span>{status || noInformation}</span>
      }</h3>
      <h3>About me: {aboutMe || noInformation}</h3>
      <h3>{lookingForAJob ? `Loking for a job: ${lookingForAJobDescription}` : ''}</h3>
      <h3>My contacts</h3>
      <ul>
        <li>Github: {contacts?.github ?
          <a href={contacts?.github} target={'_blank'}>{contacts?.github}</a> : noInformation}</li>
        <li>Instagram: {contacts?.instagram ?
          <a href={contacts?.instagram} target={'_blank'}>{contacts?.instagram}</a> : noInformation}</li>
        <li>Facebook: {contacts?.facebook ?
          <a href={contacts?.facebook} target={'_blank'}>{contacts?.facebook}</a> : noInformation}</li>
      </ul>
    </div>
  )
}