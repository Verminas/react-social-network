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
      <div
        style={{
          fontSize: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
          color: "#636363",
        }}
      >
        <p>
          To log in get registered{" "}
          <a
            href="https://social-network.samuraijs.com/"
            target="_blank"
            style={{ color: "#1677FF" }}
          >
            here
          </a>
        </p>
        <p>or use common test account credentials: </p>
        <p>Email: free@samuraijs.com</p>
        <p>Password: free</p>
      </div>
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
