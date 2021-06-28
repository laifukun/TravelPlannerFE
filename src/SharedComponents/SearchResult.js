import { useEffect, useState } from "react";
import { Button, Drawer, List, message, Typography, Tooltip, Card} from "antd";
import '../styles/SearchResult.css';

function SearchResult({searchData, visible, onClose}) {
    //const [resultVisible, setResultVisible] = useState(false);
    const [loading, setLoading] = useState(false);
 
    const onCloseDrawer = () => {
      onClose();
    };
   
    /*
    const onOpenDrawer = () => {
      setResultVisible(true);
    };
    */
    return (
           <Drawer
                onClose={onCloseDrawer}
                visible={visible }
                width={450}
                placement='left'
                style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '5' }}
                getContainer={false}
            >

                <List
                    style={{ marginTop: 40 }}
                    loading={loading}
                    dataSource={searchData}
                    renderItem={(item) => (
                      <List.Item>
                        <Card
                          title={item.name}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{ height: 340, width: "100%", display: "block" }}
                          />
                          {item.description}
                        </Card>
                      </List.Item>
                    )}
                />
            </Drawer>
    )
}

export default SearchResult
