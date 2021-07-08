import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import {LockOutlined, UserOutlined, UserAddOutlined} from "@ant-design/icons";
import { register } from "../Utils/userUtils";

const RegistrationForm = ({onSuccess}) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const onFinish = (data) => {
        setLoading(true);
        onRegister(data);
    }
  
    const onRegister = (data) => {
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

    const onCancel =() => {
        setVisible(false);
    }
    return (
        <>
        <Button type="primary" onClick={()=>setVisible(true)} icon={<UserAddOutlined />}>
            Register
        </Button>

        <Modal 
            visible={visible}
            onCancel={onCancel}
            footer={[
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
            <Button type="primary" htmlType="submit" loading={loading}>
                Register
            </Button>
            </Form.Item>

        </Form>,]}
            >
        </Modal>
        </>
    )
}

export default RegistrationForm
