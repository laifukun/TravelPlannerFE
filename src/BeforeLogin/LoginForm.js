import { Button, Form, Input, message, Modal } from "antd";
import React, {useState} from "react";
import {LockOutlined, UserOutlined, LoginOutlined} from "@ant-design/icons";
import { login } from "../Utils/userUtils";

function LoginForm({onLoginSuccess}) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const onFinish = (data) => {
        setLoading(true);
        onLogin(data);
    }
  
    const onLogin = (data) => {
        login(data).then(() => {
            message.success(`Login Successful`);
            onLoginSuccess(data.username)
        }).catch((err) => {
            message.error(err.message);
        }).finally(() => {
            setLoading(false);
            setVisible(false);
        });
    };

    const onCancel =() => {
        setVisible(false);
    }

    return (
        <>
        <Button type="primary" htmlType="submit" onClick={()=>setVisible(true)} icon={<LoginOutlined />}>
            Login
        </Button>
        <Modal 
        visible={visible}
        onCancel={onCancel}
        footer={[
            <Form
            name="normal_login"
            onFinish={onFinish}
            style={{
                width: 300,
                margin: "auto",
            }}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" /> 
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                Login
                </Button>
            </Form.Item>
            </Form>,]}
        >
        </Modal>
        </>
    );
  
}
 
export default LoginForm;



