import { useEffect, useState } from "react";
import { Button, Drawer, List, message, Typography, Tooltip, Card} from "antd";
import '../styles/SearchResult.css';

function SearchResult({searchData}) {
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [loading, setLoading] = useState(false);
 
    const onCloseDrawer = () => {
        setSearchResultVisible(false);
    };
     
    const onOpenDrawer = () => {
        setSearchResultVisible(true);
    };
    
    useEffect(()=>{
        searchData ? setSearchResultVisible(true):setSearchResultVisible(false);
    })
    

    return (
           <Drawer
                onClose={onCloseDrawer}
                visible={searchResultVisible && searchData}
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
