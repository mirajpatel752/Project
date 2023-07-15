import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const existingUserData = localStorage.getItem('userData');
    const users = existingUserData ? JSON.parse(existingUserData) : [];

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'success',
            duration: 2,
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
            duration: 2,
        });
    };

    const onFinish = (values) => {
        const loggedInUser = users.find(
            (user) => user.email === values.email && user.password === values.password
        );
        const username = users.find(
            (user) => user.username === values.email && user.password === values.password
        );
        if (loggedInUser) {
            success()
            navigate("/dashboard")
        } else if (username) {
            success()
            navigate("/dashboard")
        } else {
            error()
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {contextHolder}
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Sign In
                    </Button>
                </Form.Item>
                <Button style={{ width: '100%' }} onClick={() => navigate("/register")}>Register</Button>
            </Form>
        </div>
    );
}

export default Login;
