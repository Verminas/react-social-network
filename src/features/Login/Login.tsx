import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "app/store";
import {PATH} from "router/router";
import {authActions, selectIsLoggedIn} from "app/reducers/authSlice";
import {Button, Checkbox, Form, Input} from 'antd';
import {useEffect, useState} from "react";

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};


type FieldType = Partial<Inputs>


export const Login = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useAppDispatch();
    const [errorFields, setErrorFields] = useState<FieldType>({});
    const [form] = Form.useForm()


    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if(errorFields.email || errorFields.password) {
            timeoutId = setTimeout(() => {
                setErrorFields({})
            }, 5000)
        }

        return () => clearTimeout(timeoutId);
    }, [errorFields]);

    if (isLoggedIn) {
        return <Navigate to={PATH.COMMON}/>;
    }

    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const rulesEmail = [{required: true, message: 'Email required'}, {
        message: 'Invalid email',
        pattern: emailRegExp,
    }]
    const rulesPassword = [{required: true, message: 'Password required'},
        {
            min: 4,
            message: "Password must be at least 4 characters",
        }, {message: "Password must not exceed 12 characters", max: 12}]

    const onSubmit = (data: Inputs) => {
        dispatch(authActions.logIn(data))
            .unwrap()
            .catch(err => {
                if (err.messages.length) {
                    setErrorFields({email: err.messages[0], password: err.messages[0]})
                }
            });
    }


    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600, alignSelf: 'center'}}
            initialValues={{remember: true}}
            onFinish={onSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={rulesEmail}

                help={errorFields?.email}
                validateStatus={errorFields?.email ? 'error' : ''}
            >
                <Input placeholder={'Enter you email'}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={rulesPassword}

                help={errorFields?.password}
                validateStatus={errorFields?.password ? 'error' : ''}
            >
                <Input.Password placeholder={'Enter you password'}/>
            </Form.Item>

            <Form.Item<FieldType>
                name="rememberMe"
                valuePropName="checked"
                wrapperCol={{offset: 8, span: 16}}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

