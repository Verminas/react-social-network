import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { FieldType, useLogin } from "features/Auth/lib/useLogin";
import {
  buttonStyles,
  checkBoxStyles,
  formStyles,
} from "features/Auth/ui/Login.styles";

export const Login = () => {
  const { form, onSubmit, errorFields, rulesPassword, rulesEmail } = useLogin();
  return (
    <Form
      form={form}
      name="basic"
      style={formStyles}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
      variant={"outlined"}
      size="large"
    >
      <Form.Item<FieldType>
        name="email"
        rules={rulesEmail}
        help={errorFields?.email}
        validateStatus={errorFields?.email ? "error" : ""}
      >
        <Input placeholder={"Enter you email"} prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={rulesPassword}
        help={errorFields?.password}
        validateStatus={errorFields?.password ? "error" : ""}
      >
        <Input.Password
          placeholder={"Enter you password"}
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="rememberMe"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox style={checkBoxStyles}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={buttonStyles}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
