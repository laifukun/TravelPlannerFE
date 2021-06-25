import { Button, Form, Input, message } from "antd";
import React, {useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
 
function LoginForm(props) {
    const [loading, setLoading] = useState(false);
 
    function onFinish(data) {
        setLoading(true);
        login(data)
        .then(() => {
            message.success(`Login Successful`);
            props.onSuccess();
        })
        .catch((err) => {
            message.error(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    };
 
  
    return (
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
        </Form>
    );
  
}
 
export default LoginForm;



