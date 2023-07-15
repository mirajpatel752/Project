import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values:', values);
        const existingUserData = localStorage.getItem('userData');
        const userDataArray = existingUserData ? JSON.parse(existingUserData) : [];
        const newUserId = Date.now();
        const userData = {
            id: newUserId,
            email: values.email,
            password: values.password,
            phone: values.phone,
            username: values.username,
        };
        userDataArray.push(userData);
        localStorage.setItem('userData', JSON.stringify(userDataArray));
        navigate("/")
    };

    const validatePassword = (_, value, callback) => {
        if (value && value.length < 8) {
            callback('Password must be at least 8 characters long');
        } else {
            callback();
        }
    };

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords do not match'));
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="register-form"
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[
                        { required: true, message: 'Please enter your phone number' },
                        { pattern: /^[0-9]*$/, message: 'Please enter a valid phone number' },
                    ]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password' },
                        { validator: validatePassword },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        validateConfirmPassword,
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Register
                    </Button>

                </Form.Item>
                <Button onClick={() => navigate("/")} style={{ width: '100%' }}>BACK</Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
