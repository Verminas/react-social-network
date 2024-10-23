// @flow
import * as React from "react";
import { KeyboardEvent, useContext, useRef } from "react";
import { Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { WindowWidthContext } from "app/App";
import styled from "styled-components";

type Props = {
  onSubmitForm: (value: string) => void;
  placeholder?: string;
};
export const SubmitForm = ({ onSubmitForm, placeholder }: Props) => {
  const [form] = Form.useForm();
  const textAreaRef = useRef<HTMLFormElement | null>(null);

  const { isTabletWidth } = useContext(WindowWidthContext);

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
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "15px",
      }}
      onFinish={onSubmit}
      onKeyDown={onKeyDownHandler}
      autoFocus
    >
      <Form.Item name="text" style={{ width: isTabletWidth ? "100%" : "70%" }}>
        <TextArea
          showCount
          maxLength={150}
          placeholder={placeholder}
          style={{ height: isTabletWidth ? 100 : 80, resize: "none" }}
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
