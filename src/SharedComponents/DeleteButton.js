import { useEffect, useState} from "react";
import { Button, Popconfirm} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";


const DeleteButton = ({type, icon, deleteAction}) => {
    const [visible, setVisible] = useState(false);
  
    const onConfirm=()=>{
      setVisible(false);
      deleteAction();
    }
    const onCancel=()=>{
      setVisible(false);
    }
    return (
      //<div>
        <Popconfirm title="Are you sure you want to delete？" 
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    visible={visible}
                    okText="Yes"
                    cancelText="No"
        >
          <Button
            type={type}
            icon={icon}
            onClick={()=>setVisible(true)}
            size='small'
            style={{padding: '0px', margin: '0px'}}
          />
        </Popconfirm>
      //</div>
    )
  }

  export default DeleteButton