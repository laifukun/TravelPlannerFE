import { useEffect, useState } from "react";
import { Button, Drawer, List, message, Typography, Tooltip, Card} from "antd";
import '../styles/SearchResult.css';

function SearchResult({poiData}) {
    const [loading, setLoading] = useState(false);
    return (
           <Drawer
                onClose={console.log("close draw")}
                visible={true}
                width={400}
                placement='left'
                style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '5' }}
                getContainer={false}
            >

                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 2,
                      md: 4,
                      lg: 4,
                      xl: 3,
                      xxl: 3,
                    }}
                    dataSource={poiData}
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
                          //{`item.description`}
                        </Card>
                      </List.Item>
                    )}
                />
            </Drawer>
    )
}

export default SearchResult
