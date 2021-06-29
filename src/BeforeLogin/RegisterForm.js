import { Button, Form, Input, message, Modal } from "antd";
import React, {useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";
 
function RegisterForm(props) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    
   
 
    function onFinish(data) {
        
        setLoading(true);
        register(data)
        .then(() => {
            message.success(`Registration Successful`);
            props.history.push('/Login');
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
        name="normal_registration"
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
            name="firstname"
            rules={[{ required: true, message: "Please input your first name!" }]}
        >
            <Input prefix={<UserOutlined />} placeholder="Firstname" />
        </Form.Item>

        <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Please input your last name!" }]}
        >
            <Input prefix={<UserOutlined />} placeholder="Lastname" />
        </Form.Item>



        <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
        >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>



        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
            Register
            </Button>
        </Form.Item>
        </Form>
    );
  
}
 

export default RegisterForm; 