import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import React, { useContext, useEffect } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import {
  selectUserStatus,
  userStatusActions,
} from "features/SocialNetwork/model/userStatusSlice";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";
import { ContactItem } from "common/components/ContactItem/ContactItem";

export const noInformation = "no information";

export const Info = () => {
  const { user, isAuthUser } = useContext(UserContext);
  const {
    userId,
    lookingForAJobDescription,
    lookingForAJob,
    aboutMe,
    fullName,
    contacts,
  } = user;

  const status = useSelector(selectUserStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthUser && status) return;
    dispatch(userStatusActions.getUserStatus(userId));
  }, [userId]);

  const changeStatus = (title: string) => {
    dispatch(userStatusActions.updateUserStatus({ title, userId }));
  };

  const contactsInfo = Object.entries(contacts).reduce(
    (acc, [title, href], index) => {
      if (href && typeof href === "string") {
        acc.push(<ContactItem title={title} href={href} key={title} />);
      }

      return acc;
    },
    [] as JSX.Element[],
  );

  return (
    <div>
      <h2>{fullName}</h2>
      <h3>
        My status:{" "}
        {isAuthUser ? (
          <EditableSpan
            title={status || noInformation}
            editItem={changeStatus}
          />
        ) : (
          <span>{status || noInformation}</span>
        )}
      </h3>
      <h3>About me: {aboutMe || noInformation}</h3>
      <h3>
        {lookingForAJob ? `Loking for a job: ${lookingForAJobDescription}` : ""}
      </h3>
      {contactsInfo.length ? (
        <>
          <h3>My contacts</h3>
          <ul>{contactsInfo}</ul>
        </>
      ) : (
        <h3>My contacts: {noInformation}</h3>
      )}
    </div>
  );
};
