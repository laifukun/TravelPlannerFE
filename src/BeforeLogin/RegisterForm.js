import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";

const RegistrationForm = ({onSuccess, toLoginForm}) => {
    const [loading, setLoading] = useState(false);

    const onFinish = (data) => {
        setLoading(true);
        register(data).then(() => {
            message.success(`Register Successful, please Login`);
            onSuccess();
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
        name="user_register"
        onFinish={onFinish}
        style={{
          width: 300,
          margin: "auto",
        }}
        >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>
        
 
        <Form.Item>
        <div style = {{display: "flex", 
        justifyContent: "space-between"}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
          <Button type="primary" htmlType="submit" onClick={toLoginForm}>
            Already a member? Login
            </Button>  
        </div>
        </Form.Item>
      </Form>
    )
}

export default RegistrationForm
