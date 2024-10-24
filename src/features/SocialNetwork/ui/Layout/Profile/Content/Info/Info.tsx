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
import { InfoItem } from "common/components/InfoItem/InfoItem";

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
      <InfoItem
        label={"My status"}
        item={
          isAuthUser ? (
            <EditableSpan
              title={status || noInformation}
              editItem={changeStatus}
            />
          ) : (
            status || noInformation
          )
        }
      />
      <InfoItem label={"About me"} item={aboutMe || noInformation} />
      <InfoItem
        label={lookingForAJob ? "Loking for a job" : ""}
        item={lookingForAJobDescription}
      />
      <InfoItem
        label={"My contacts"}
        item={contactsInfo.length ? contactsInfo : noInformation}
      />
    </div>
  );
};
