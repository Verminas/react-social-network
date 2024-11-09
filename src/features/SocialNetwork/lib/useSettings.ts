import { Form, notification } from "antd";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { currentUserActions, selectCurrentUser } from "../model/currentUserSlice";
import { UpdateUserProfileRequestType, UserProfileContacts } from "../api/socialAPI";

export const useSettings = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit = (values: unknown) => {
    const formData = values as FieldsType
    const data: UpdateUserProfileRequestType = {
      fullName: formData.fullName || currentUser.fullName,
      aboutMe: formData.aboutMe || currentUser.aboutMe || "",
      lookingForAJob: formData.lookingForAJob || currentUser.lookingForAJob,
      lookingForAJobDescription:
        formData.lookingForAJobDescription ||
        currentUser.lookingForAJobDescription,
      contacts: {
        facebook: formData.facebook || currentUser.contacts.facebook,
        twitter: formData.twitter || currentUser.contacts.twitter,
        vk: formData.vk || currentUser.contacts.vk,
        instagram: formData.instagram || currentUser.contacts.instagram,
        github: formData.github || currentUser.contacts.github,
        youtube: formData.youtube || currentUser.contacts.youtube,
        mainLink: formData.mainLink || currentUser.contacts.mainLink,
        website: formData.website || currentUser.contacts.website,
      },
    };

    dispatch(currentUserActions.updateCurrentUserProfile(data))
      .unwrap()
      .then(() =>
        notification.success({ message: "Profile info updated successfully." }),
      )
      .catch((err) => {
        if (err.messages?.length) {
          notification.error({ message: err.messages[0] });
        }
      });
  };

  return {form, currentUser, onSubmit}
}

export type FieldsType = Partial<
  Omit<UpdateUserProfileRequestType, "contacts"> & UserProfileContacts
>;