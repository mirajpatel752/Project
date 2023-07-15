import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Space, Popconfirm } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedUsers = localStorage.getItem('userDataTable');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        setSelectedUser(null);
        form.resetFields();
    };

    const showEditModal = (user) => {
        setIsModalVisible(true);
        setSelectedUser(user);
        form.setFieldsValue(user);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFinish = (values) => {
        const updatedUser = {
            id: selectedUser ? selectedUser.id : uuidv4(),
            ...values,
        };

        let updatedUsers;
        if (selectedUser) {
            updatedUsers = users.map((user) =>
                user.id === selectedUser.id ? updatedUser : user
            );
        } else {
            updatedUsers = [...users, updatedUser];
        }

        setUsers(updatedUsers);
        localStorage.setItem('userDataTable', JSON.stringify(updatedUsers));
        setIsModalVisible(false);
    };

    const handleDelete = (user) => {
        const updatedUsers = users.filter((u) => u.id !== user.id);
        setUsers(updatedUsers);
        localStorage.setItem('userDataTable', JSON.stringify(updatedUsers));
    };

    const columns = [
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Salary', dataIndex: 'salary', key: 'salary' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                    <Popconfirm
                        title="Delete the Row"
                        description="Are you sure to delete this user Data?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger >Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add User
            </Button>
            <Modal
                title={selectedUser ? 'Edit User' : 'Add User'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="salary"
                        label="Salary"
                        rules={[{ required: true, message: 'Please enter salary' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedUser ? 'Update' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={users} columns={columns} rowKey="id" />
        </div>
    );
};

export default Dashboard;
