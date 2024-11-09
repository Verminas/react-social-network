import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { FieldType, useLogin } from "features/Auth/lib/useLogin";
import { PATH } from "common/router/router";
import { Navigate } from "react-router-dom";
import { S } from "./Login.styles";

export const Login = () => {
  const { form, onSubmit, errorFields, rulesPassword, rulesEmail, isLoggedIn } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={PATH.COMMON} />;
  }
  return (
    <S.StyledForm
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
      variant={"outlined"}
      size="large"
    >
      <S.TextWrapper>
        <p>
          To log in get registered{" "}
          <a href="https://social-network.samuraijs.com/" target="_blank">
            here
          </a>
        </p>
        <p>or use common test account credentials: </p>
        <p>Email: free@samuraijs.com</p>
        <p>Password: free</p>
      </S.TextWrapper>
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

      <S.FormItemCheckbox
        name="rememberMe"
        valuePropName="checked"
      >
        <S.StyledCheckbox>Remember me</S.StyledCheckbox>
      </S.FormItemCheckbox>

      <Form.Item>
        <S.ButtonSubmit type="primary" htmlType="submit">
          Login
        </S.ButtonSubmit>
      </Form.Item>
    </S.StyledForm>
  );
};
