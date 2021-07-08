import { useEffect, useState} from "react";
import { Button, Popconfirm} from "antd";
import {MinusSquareFilled,  MenuFoldOutlined, MenuUnfoldOutlined, SaveOutlined, QuestionCircleOutlined, PlusOutlined, PlusSquareFilled, CloseSquareFilled, NodeIndexOutlined} from "@ant-design/icons";


const DeleteButton = ({type, icon, onDelete}) => {
    const [visible, setVisible] = useState(false);
  
    const onConfirm=()=>{
      setVisible(false);
      onDelete();
    }
    const onCancel=()=>{
      setVisible(false);
    }
    return (
      <div>
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
          />
        </Popconfirm>
      </div>
    )
  }

  export default DeleteButton