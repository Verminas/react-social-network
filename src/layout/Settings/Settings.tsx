import React from "react";
import { notification } from "antd";
import s from "./Settings.module.css";
import { Button, Checkbox, Form, Input } from "antd";
import { authActions } from "features/Auth/model/authSlice";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  currentUserActions,
  selectCurrentUser,
} from "app/reducers/currentUserSlice";
import {
  UpdateUserProfileRequestType,
  UserProfileContacts,
} from "common/instance/socialAPI";
const { TextArea } = Input;

export const Settings = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit = (formData: FieldsType) => {
    const data: UpdateUserProfileRequestType = {
      fullName: formData.fullName || currentUser.fullName,
      aboutMe: formData.aboutMe || currentUser.aboutMe,
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
        if (err.messages.length) {
        }
      });
  };

  return (
    <Form
      form={form}
      name="settings"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, alignSelf: "center", margin: "0 auto" }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldsType>
        label="Full Name"
        name="fullName"
        initialValue={currentUser.fullName || ""}
      >
        <Input placeholder={"Enter you full name"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="About Me"
        name="aboutMe"
        initialValue={currentUser.aboutMe || ""}
      >
        <TextArea
          showCount
          maxLength={100}
          placeholder="Enter something about you"
          style={{ height: 60, resize: "none" }}
        />
      </Form.Item>

      <Form.Item<FieldsType>
        name="lookingForAJob"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
        initialValue={currentUser.lookingForAJob || false}
      >
        <Checkbox>Looking for a job</Checkbox>
      </Form.Item>

      <Form.Item<FieldsType>
        label="Job description"
        name="lookingForAJobDescription"
        initialValue={currentUser.lookingForAJobDescription || ""}
      >
        <TextArea
          showCount
          maxLength={100}
          placeholder="Enter something about a job"
          style={{ height: 60, resize: "none" }}
        />
      </Form.Item>

      <Form.Item label="Contacts"></Form.Item>

      <Form.Item<FieldsType>
        label="Facebook"
        name="facebook"
        initialValue={currentUser.contacts?.facebook || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Github"
        name="github"
        initialValue={currentUser.contacts?.github || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Instagram"
        name="instagram"
        initialValue={currentUser.contacts?.instagram || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="MainLink"
        name="mainLink"
        initialValue={currentUser.contacts?.mainLink || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Twitter"
        name="twitter"
        initialValue={currentUser.contacts?.twitter || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Vkontakte"
        name="vk"
        initialValue={currentUser.contacts?.vk || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Website"
        name="website"
        initialValue={currentUser.contacts?.website || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Youtube"
        name="youtube"
        initialValue={currentUser.contacts?.youtube || ""}
      >
        <Input placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

type FieldsType = Partial<
  Omit<UpdateUserProfileRequestType, "contacts"> & UserProfileContacts
>;
