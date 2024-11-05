import { KeyboardEvent, useRef } from "react";
import { Form } from "antd";
import { S } from "./SubmitForm.styles";

type Props = {
  onSubmitForm: (value: string) => void;
  placeholder?: string;
};
export const SubmitForm = ({ onSubmitForm, placeholder }: Props) => {
  const [form] = Form.useForm();
  const textAreaRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = (values: unknown) => {
    const { text } = values as { text: string };
    if (text && text.trim().length) {
      onSubmitForm(text.trim());
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
    <S.StyledForm
      name="submitForm"
      layout={"inline"}
      form={form}
      onFinish={onSubmit}
      onKeyDown={onKeyDownHandler}
      autoFocus
    >
      <S.StyledItem name="text">
        <S.StyledTextarea
          showCount
          maxLength={150}
          placeholder={placeholder}
          autoFocus
          ref={textAreaRef}
        />
      </S.StyledItem>

      <S.StyledButton type="primary" htmlType="submit">
        Submit
      </S.StyledButton>
    </S.StyledForm>
  );
};
