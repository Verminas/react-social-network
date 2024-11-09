import React from "react";
import { Checkbox, Form } from "antd";
import { S } from "./Settings.styles";
import { FieldsType, useSettings } from "../../../lib/useSettings";

export const Settings = () => {
  const { form, onSubmit, currentUser } = useSettings();

  return (
    <S.StyledForm
      form={form}
      name="settings"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item<FieldsType>
        label="Full Name"
        name="fullName"
        initialValue={currentUser.fullName || ""}
      >
        <S.StyledInput placeholder={"Enter you full name"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="About Me"
        name="aboutMe"
        initialValue={currentUser.aboutMe || ""}
      >
        <S.StyledTextArea
          showCount
          maxLength={100}
          placeholder="Enter something about you"
        />
      </Form.Item>

      <Form.Item<FieldsType>
        name="lookingForAJob"
        valuePropName="checked"
        initialValue={currentUser.lookingForAJob || false}
      >
        <Checkbox>Looking for a job</Checkbox>
      </Form.Item>

      <Form.Item<FieldsType>
        label="Job description"
        name="lookingForAJobDescription"
        initialValue={currentUser.lookingForAJobDescription || ""}
      >
        <S.StyledTextArea
          showCount
          maxLength={100}
          placeholder="Enter something about a job"
        />
      </Form.Item>

      <Form.Item label="Contacts" />

      <Form.Item<FieldsType>
        label="Facebook"
        name="facebook"
        initialValue={currentUser.contacts?.facebook || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Github"
        name="github"
        initialValue={currentUser.contacts?.github || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Instagram"
        name="instagram"
        initialValue={currentUser.contacts?.instagram || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="MainLink"
        name="mainLink"
        initialValue={currentUser.contacts?.mainLink || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Twitter"
        name="twitter"
        initialValue={currentUser.contacts?.twitter || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Vkontakte"
        name="vk"
        initialValue={currentUser.contacts?.vk || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Website"
        name="website"
        initialValue={currentUser.contacts?.website || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <Form.Item<FieldsType>
        label="Youtube"
        name="youtube"
        initialValue={currentUser.contacts?.youtube || ""}
      >
        <S.StyledInput placeholder={"Enter your contact"} />
      </Form.Item>

      <S.StyledButton type="primary" htmlType="submit">
        Submit
      </S.StyledButton>
    </S.StyledForm>
  );
};
