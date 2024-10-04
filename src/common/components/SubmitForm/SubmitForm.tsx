// @flow
import * as React from "react";
import { KeyboardEvent } from "react";
import { Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  onSubmitForm: (value: string) => void;
  placeholder?: string;
};
export const SubmitForm = ({ onSubmitForm, placeholder }: Props) => {
  const [form] = Form.useForm();

  const onSubmit = (formData: { text: string }) => {
    if (formData.text && formData.text.trim().length) {
      onSubmitForm(formData.text.trim());
    }

    form.resetFields();
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLFormElement>) => {
    e.key === "Enter" && onSubmit({ text: form.getFieldValue("text") });
  };

  return (
    <Form
      name="submitForm"
      layout={"inline"}
      form={form}
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 20,
      }}
      onFinish={onSubmit}
      onKeyDown={onKeyDownHandler}
      autoFocus
    >
      <Form.Item
        // rules={[{ min: 1, message: "Type something..", required: true }]}
        name="text"
        style={{ width: "70%" }}
      >
        <TextArea
          showCount
          maxLength={150}
          placeholder={placeholder}
          style={{ height: 80, resize: "none" }}
          autoFocus
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
