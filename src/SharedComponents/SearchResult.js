import { useEffect, useState } from "react";
import { Button, Drawer, List, message, Typography, Tooltip, Card} from "antd";
import '../styles/Search.css';

function SearchResult({searchData, visible, onClose, onSelectPOI}) {
    //const [resultVisible, setResultVisible] = useState(false);
    const [loading, setLoading] = useState(false);
 
    const onCloseDrawer = () => {
      onClose();
    };

    const onClickPOI = (item)=> {
      onSelectPOI(item);
    }
    return (
           <Drawer
                onClose={onCloseDrawer}
                visible={visible }
                width={375}
                placement='left'
                style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '20' }}
                getContainer={false}
                maskClosable={false}
                mask={false}
            >

              <List
                    style={{ marginTop: 40, marginLeft: 10 }}
                    loading={loading}
                    dataSource={searchData}
                    renderItem={(item) => (
                      <List.Item style={{paddingBottom: 1, border: "hidden"}}
                      >
                        <Card
                          hoverable
                          style ={{width: 270, maxHeight: 400, border: "hidden" }}
                          cover={<img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{ height: 200, display: "block" }}
                            />}
                            onClick={()=>onClickPOI(item)}
                        >
                          
                          <Card.Meta 
                            title={item.name} 
                            description = {item.description} 
                            className="search-card"                            
                            />
                          
                        </Card>
                      </List.Item>
                    )}
                />
            </Drawer>
    )
}

export default SearchResult
