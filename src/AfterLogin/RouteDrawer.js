import { useEffect, useState} from "react";
import { Button, Drawer, List, Divider, message, Input, Form, Space, Row, Col} from "antd";
import '../styles/RouteDrawer.css';
import { getRoute } from "../utils";
import TextArea from "antd/lib/input/TextArea";

const RouteDrawer = () =>{
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState();

  const data = [
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
      setIsVisible(true);
  };

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  useEffect(() => {
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
        width={400}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '10' }}
        getContainer={false}
     >
      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="routes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space direction="vertical" key={key} style={{ marginBottom: 20 , width: 350}}>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input route's name at this field.",
                    },
                  ]}
                  {...restField}
                  name={[name, 'route-name']}
                  fieldKey={[fieldKey, 'route-name']}
                >
                  <Input size="large" placeholder="Customize your route name here." autoSize/>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'departure']}
                  fieldKey={[fieldKey, 'departure']}
                >
                  <TextArea defaultValue = {routeData?.startAddress} placeholder="STARTING FROM" autoSize/>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'poi']}
                  fieldKey={[fieldKey, 'poi']}
                >
                <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  
                  <List.Item>
                    <List.Item.Meta
                      avatar={<img src={item.url} width="80" height="60"></img>}
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
                />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'destination']}
                  fieldKey={[fieldKey, 'destination']}
                >
                  <TextArea defaultValue = {routeData?.endAddress} placeholder="DESTINATION" autoSize/>
                </Form.Item>
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