import { Checkbox, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {S} from "./SearchForm.styles"

type Props = {
  onClickBtn: (arg: { user: string; friend: boolean }) => void;
};

export const SearchForm = ({ onClickBtn }: Props) => {
  const [form] = Form.useForm();

  const onSubmit = (values: unknown) => {
    const data = values as { user: string; friend: boolean }
    onClickBtn(data);
    form.resetFields();
  };

  return (
    <S.StyledForm
      name="basic"
      layout={"inline"}
      form={form}
      onFinish={onSubmit}
    >
      <S.StyledInput name="user">
        <Input placeholder="Type username" />
      </S.StyledInput>

      <Form.Item name="friend" valuePropName="checked" initialValue={false}>
        <Checkbox>Find friends</Checkbox>
      </Form.Item>

      <Form.Item>
        <S.StyledButton
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          iconPosition={"end"}
        >
          Find
        </S.StyledButton>
      </Form.Item>
    </S.StyledForm>
  );
};
