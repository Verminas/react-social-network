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
import {NO_INFORMATION} from "common/constants/common";
import { GetUserProfileResponseType } from "../../../../../api/socialAPI";

export const Info = () => {
  const { user, isAuthUser } = useContext(UserContext);

  const {
    userId,
    lookingForAJobDescription,
    lookingForAJob,
    aboutMe,
    fullName,
    contacts,
  } = user as GetUserProfileResponseType;

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
      if (href) {
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
              title={status || NO_INFORMATION}
              editItem={changeStatus}
            />
          ) : (
            status || NO_INFORMATION
          )
        }
      />
      <InfoItem label={"About me"} item={aboutMe || NO_INFORMATION} />
      <InfoItem
        label={lookingForAJob ? "Loking for a job" : ""}
        item={lookingForAJobDescription}
      />
      <InfoItem
        label={"My contacts"}
        item={contactsInfo.length ? contactsInfo : NO_INFORMATION}
      />
    </div>
  );
};
