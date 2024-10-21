// @flow
import * as React from "react";
import { KeyboardEvent, useRef } from "react";
import { Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  onSubmitForm: (value: string) => void;
  placeholder?: string;
};
export const SubmitForm = ({ onSubmitForm, placeholder }: Props) => {
  const [form] = Form.useForm();
  const textAreaRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = (formData: { text: string }) => {
    if (formData.text && formData.text.trim().length) {
      onSubmitForm(formData.text.trim());
    }

    form.resetFields();
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit({ text: form.getFieldValue("text") });
      // todo! курсор после отправки должен быть в начале
      console.log(textAreaRef.current);
      textAreaRef?.current && textAreaRef.current.focus();
    }
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
          ref={textAreaRef}
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
