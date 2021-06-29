import { useEffect, useState } from "react";
import { Button, Drawer, List, message, Typography, Tooltip, Card} from "antd";
import '../styles/SearchResult.css';

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
                width={425}
                placement='left'
                style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '5' }}
                getContainer={false}
            >

                <List
                    style={{ marginTop: 40, marginLeft: 0 }}
                    loading={loading}
                    dataSource={searchData}
                    renderItem={(item) => (
                      <List.Item>
                        <Card
                          hoverable
                          style ={{width: 350, maxHeight: 450}}
                          cover={<img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{ height: 300, display: "block" }}
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
