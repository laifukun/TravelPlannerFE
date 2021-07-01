import { useEffect, useState} from "react";
import { Button, Drawer, List, Divider, message, Input, Form, Space, Row, Col, Menu} from "antd";
import '../styles/RouteDrawer.css';
import { getAllRoutes, getRouteDetailsById} from "../Utils/routeUtils"
import TextArea from "antd/lib/input/TextArea";

const { SubMenu } = Menu;

const RouteDrawer = () =>{
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState();
  const [poiData, setPoiData] = useState();

  const data1 = [
    {
      url: 'https://icity-static.icitycdn.com/images/uploads/ap/imsm/museum/pic_head/pd82g36/36555c82a37cfd71pd82g36.jpg',
      title: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://images.lvltravels.com/img/usa/9/how-get-into-new-york-city-museums_1.jpg',
      title: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/04/27/00/04/the-met-2264072_960_720.jpg',
      title: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://img.ianstravels.com/img/united-states/see-nyc-museums-for-free-with-bank-of-america-and-its-affiliates-2.jpg',
      title: 'New York Museum 1',
      description: 'New York Museum 2',
    },
  ];

  const onCloseDrawer = () => {
      setIsVisible(false);
  };
   
  const onOpenDrawer = () => {
    console.log("onOPenDrawer");
      setIsVisible(true);
      getAllRoutes()
      .then((data) => {
      setRouteData(data);
    })
    .catch((err) => {
      message.error(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleClick = (index) => {
    console.log('click ', index);
    getRouteDetailsById(index)
    .then((poiData) => {
    setPoiData(poiData);
  })
  .catch((err) => {
    message.error(err.message);
  })
  .finally(() => {
    setLoading(false);
  });
  };
  
/*  useEffect(() => {
    if (!isVisible) {
      return;
    } 
    setLoading(true);
    getRoute()
    .then((data) => {
      setRouteData(data);
    })
    .catch((err) => {
      message.error(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [isVisible]);
  */

  return (
    <div>
      <div className ='route-position'> 
      <Button type="primary" onClick={onOpenDrawer} size="large">
        Route
      </Button>
      </div>
      <Drawer
        title="YOUR PLAN"
        onClose={onCloseDrawer}
        visible={isVisible}
        width={500}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '10' }}
        getContainer={false}
     >
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="routes">
      {routeData.map(field => ()}
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key , name, ...Field }) => (
              <Space direction="vertical" key={key + 1} style={{ marginBottom: 20 , width: "inherit"}}>

                <Form.Item
                  style={{ margin: 0 }}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input route's name at this field.",
                    },
                  ]}
                  {...Field}
                  name={[name, {}]}
                >
                  <Menu
                    style={{ marginLeft: 0, width: 400 }}
                    mode="inline"
                  >
                    <SubMenu title={`Route ${key + 1}`}>
                      <Menu.Item style ={{height : "inherit"}}>
                        <TextArea label = "Drparture :" placeholder="Please enter the address properly!" autoSize/>
                        <List
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={poiData}
                        renderItem={(item) => (
                          
                          <List.Item>
                            <List.Item.Meta
                              avatar={<img src={item.imageUrl} width="80" height="60"></img>}
                              title={item.name}
                              description={item.description}
                            />
                          </List.Item>
                        )}
                        />
                        <TextArea label = "Destination :" placeholder="Please enter the address properly!" autoSize/>
                        <Row>
                        <Col span={12}>
                          <Button type="primary" htmlType="submit">
                            Generate
                          </Button>
                        </Col>
                        <Col span={12}>
                          <Button type="primary" onClick={() => remove(name)} >
                            Remove
                          </Button>
                        </Col>
                        </Row>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </Form.Item>
                <Divider />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} width = '80'>
                Add route
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider />
    </Form>
    </Drawer>
    </div>
    
  )
}

export default RouteDrawer