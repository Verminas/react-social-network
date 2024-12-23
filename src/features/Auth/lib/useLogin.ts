import { useSelector } from "react-redux";
import { authActions, selectIsLoggedIn } from "features/Auth/model/authSlice";
import { useAppDispatch } from "app/store";
import { useEffect, useState } from "react";
import { Form } from "antd";

export const useLogin = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [errorFields, setErrorFields] = useState<FieldType>({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    let timeoutId: NodeJS.Timeout;
    if (errorFields.email || errorFields.password) {
      timeoutId = setTimeout(() => {
        setErrorFields({});
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [errorFields, isLoggedIn]);

  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const rulesEmail = [
    { required: true, message: "Email required" },
    {
      message: "Invalid email",
      pattern: emailRegExp,
    },
  ];
  const rulesPassword = [
    { required: true, message: "Password required" },
    {
      min: 4,
      message: "Password must be at least 4 characters",
    },
    { message: "Password must not exceed 12 characters", max: 12 },
  ];

  const onSubmit = (values: unknown) => {
    const data = values as Inputs
    dispatch(authActions.logIn(data))
      .unwrap()
      .catch((err) => {
        if (err?.messages?.length) {
          setErrorFields({ email: err.messages[0], password: err.messages[0] });
        }
      });
  };

  return { form, onSubmit, rulesEmail, rulesPassword, errorFields, isLoggedIn };
};

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type FieldType = Partial<Inputs>;
