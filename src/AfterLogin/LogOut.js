import { Button, message, Modal } from "antd";
import React, {useState} from "react";
import { logout } from "../Utils/userUtils";

function Logout({onLogoutSuccess}) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

  
    const onLogout = () => {
        logout().then(() => {
            message.success(`Logout Successful`);
            onLogoutSuccess()
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
        <Button type="primary" htmlType="submit" onClick={()=>setVisible(true)}>
            Logout
        </Button>   
        <Modal 
        title = "Logout"
        visible={visible}
        onOk={onLogout}
        onCancel={onCancel}
        okText="Yes"
        cancelText="No"
        >
        <p>Are you sure to Logout?</p>
        </Modal>
        </>
    );
  
}
 
export default Logout;



