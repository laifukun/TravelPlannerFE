import {useState} from 'react'
import {Button, Modal, Form, Input} from "antd";
import { EditOutlined } from '@ant-design/icons';

const TitleEditorModal = ({buttonText, setNewName}) => {
    const [visible, setVislbe] = useState(false);
    
    const onClose = () => {
        setVislbe(false);
    }
    const onFinish=(data)=>{
        setNewName(data.Name);
        setVislbe(false);
    }
    return (
        <>
            <Button type="dash" onClick={() => {setVislbe(true)}} width = '200' size='small' icon={<EditOutlined />}>
                {buttonText}
            </Button>
            <Modal 
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Form
                    name="name-input"
                    onFinish={onFinish}
                    style={{
                        width: 300,
                        margin: "auto",
                    }}
                    >
                    <Form.Item
                        name="Name"
                        rules={[{ required: true, message: "Please input your new name!" }]}
                    >
                        <Input placeholder="new name" defaultValue="new title"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"> Confirm </Button>
                    </Form.Item>
                    </Form>,]}
                >
                    <h2>Input New Name</h2>
            </Modal> 
        </>
    )
}

export default TitleEditorModal
