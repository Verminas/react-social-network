import { Button, Form, Input } from 'antd';

type Props = {
  onClickBtn: (title: string) => void;
};

export const SearchForm = ({onClickBtn}: Props) => {
  const [form] = Form.useForm();

  const onSubmit = (data: {user: string}) => {
    if(data.user?.trim().length) {
      onClickBtn(data.user)

      form.resetFields()
    }
  }

  return (
      <Form
          name="basic"
          layout={'inline'}
          form={form}
          style={{ maxWidth: 'none' }}
          onFinish={onSubmit}
      >
        <Form.Item rules={[{min: 1, message: 'Type something', required: true}]} name='user'>
          <Input placeholder="Type username" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Find</Button>
        </Form.Item>
      </Form>
  );
};
