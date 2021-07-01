import { useEffect, useState} from "react";
import { Button, Drawer, List, Divider, message, Input, Form, Space, Row, Col, Tooltip} from "antd";
import {DoubleRightOutlined,MinusSquareFilled, MenuOutlined, MediumCircleFill} from "@ant-design/icons";
import '../styles/RouteDrawer.css';
import { getAllRoutes } from "../Utils/routeUtils";
import TextArea from "antd/lib/input/TextArea";
import SortList from "./DragList";


const RouteDrawer = () =>{
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState([]);

  const data2 = [
    {
      id: 72,
      url: "http://localhost:8000/api/courseware/course_section/72/",
      course_id: 37,
      name: "Okay",
      ordering: 1,
      published_at: null,
      subsections: [
        "http://localhost:8000/api/courseware/course_subsection/57/",
        "http://localhost:8000/api/courseware/course_subsection/58/"
      ]
    },
    {
      id: 74,
      url: "http://localhost:8000/api/courseware/course_section/74/",
      course_id: 37,
      name: "y",
      ordering: 2,
      published_at: null,
      subsections: []
    },
    {
      id: 75,
      url: "http://localhost:8000/api/courseware/course_section/75/",
      course_id: 37,
      name: "o",
      ordering: 3,
      published_at: null,
      subsections: []
    },
    {
      id: 76,
      url: "http://localhost:8000/api/courseware/course_section/76/",
      course_id: 37,
      name: "o",
      ordering: 4,
      published_at: null,
      subsections: [
        "http://localhost:8000/api/courseware/course_subsection/59/",
        "http://localhost:8000/api/courseware/course_subsection/60/",
        "http://localhost:8000/api/courseware/course_subsection/61/",
        "http://localhost:8000/api/courseware/course_subsection/62/",
        "http://localhost:8000/api/courseware/course_subsection/63/",
        "http://localhost:8000/api/courseware/course_subsection/64/",
        "http://localhost:8000/api/courseware/course_subsection/65/"
      ]
    }
  ];
  
  const data = [
    {
      url: 'https://icity-static.icitycdn.com/images/uploads/ap/imsm/museum/pic_head/pd82g36/36555c82a37cfd71pd82g36.jpg',
      name: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://images.lvltravels.com/img/usa/9/how-get-into-new-york-city-museums_1.jpg',
      name: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/04/27/00/04/the-met-2264072_960_720.jpg',
      name: 'New York Museum 1',
      description: 'New York Museum 2',
    },
    {
      url: 'https://img.ianstravels.com/img/united-states/see-nyc-museums-for-free-with-bank-of-america-and-its-affiliates-2.jpg',
      name: 'New York Museum 1',
      description: 'New York Museum 2',
    },
  ];

  const onCloseDrawer = () => {
      setVisible(false);
  };
   
  const onOpenDrawer = () => {
    getRouteData();
    setVisible(true);
  };

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const getRouteData = ()=>{
    setLoading(true);
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
  }
 
  return (
    <>
      <div className ='route-position'> 
        <Button type="primary" onClick={onOpenDrawer} size="medium">
          Route
        </Button>
      </div>
      <Drawer
        title="YOUR PLAN"
        onClose={onCloseDrawer}
        visible={visible}
        width={400}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingBottom: '0px', zIndex: '10' }}
        getContainer={false}
        maskClosable={false}
        mask={false}
     >
       <List
          style={{ marginTop: 0, marginLeft: 0 }}
          loading={loading}
          dataSource={routeData}
          renderItem={(item) => (
          <List.Item className="route-item"
          >
            <div className="route-title">
              <Tooltip title="Route details">            
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  style={{fontSize: "medium", fontWeight: "bold"}}
                  //onClick={removeFromCart}
                >
                  {item.name} 
                </Button>
              </Tooltip>     
              <Tooltip title="Remove route"> 
                <Button
                  type="primary"
                  icon={<MinusSquareFilled />}
                  //onClick={removeFromCart}
                />
                </Tooltip> 
              </div>
              <div style={{paddingLeft: 30}}>
                <SortList routeData={data} 
              />
              </div>
              
          </List.Item>
          )}
        />
    
      {/*
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
                dataSource={routeData}
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
                */}

    </Drawer>
    </>
    
  )
}

export default RouteDrawer