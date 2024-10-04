import { Button, Checkbox, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  onClickBtn: (arg: { user: string; friend: boolean }) => void;
};

export const SearchForm = ({ onClickBtn }: Props) => {
  const [form] = Form.useForm();

  const onSubmit = (data: { user: string; friend: boolean }) => {
    // if (data.user?.trim().length) {
    onClickBtn(data);
    form.resetFields();
    // }
  };

  return (
    <Form
      name="basic"
      layout={"inline"}
      form={form}
      style={{ maxWidth: "none" }}
      onFinish={onSubmit}
    >
      <Form.Item
        // rules={[{ min: 1, message: "Type something", required: true }]}
        name="user"
      >
        <Input placeholder="Type username" />
      </Form.Item>

      <Form.Item name="friend" valuePropName="checked" initialValue={false}>
        <Checkbox>Find friends</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          iconPosition={"end"}
        >
          Find
        </Button>
      </Form.Item>
    </Form>
  );
};
