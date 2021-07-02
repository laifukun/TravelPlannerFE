import { useEffect, useState} from "react";
import { Button, Drawer, List, Modal, message, Input, Form, Space, Row, Col, Tooltip} from "antd";
import {DoubleRightOutlined,MinusSquareFilled, MenuOutlined, MediumCircleFill} from "@ant-design/icons";
import '../styles/RouteDrawer.css';
import { getAllRoutes, deleteRoute, saveRoute, getRouteDetailsById } from "../Utils/routeUtils";
import TextArea from "antd/lib/input/TextArea";
import SortList from "./DragList";
import Item from "antd/lib/list/Item";

const RoutePOI = ({route, generateRoute, saveRoute, updateRoute})=> {

  const onChangeStartAddress=(e)=>{
    updateRoute(route.name, "startAddress", e.target.value);
  }

  const onChangeEndAddress=(e)=> {
    updateRoute(route.name, "endAddress", e.target.value);
  }

  return (
    <div style={{paddingLeft: 20, width: "100%"}}>
      <Input defaultValue={route?.startAddress} onChange={onChangeStartAddress}/>

      <SortList poiData={route?.poiList} />

      <Input defaultValue={route?.endAddress}  onChange={onChangeEndAddress}/>
      <div style={{paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <Button type="primary" onClick={()=>generateRoute(route)} width = '80'>
              Generate route
        </Button>
        <Button type="primary" onClick={()=>saveRoute(route)} width = '80'>
              Save route
        </Button>
      </div>
      
    </div>
  );

}

const RouteDrawer = ({generateRoute, poiToTrip}) =>{
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const [routeNameModalVisible, setRouteNameModalVisible] = useState(false);
  const [poiListVisible,setPoiListVisible] = useState([]);


  useEffect(()=>{
    if (poiToTrip) {
      const index = poiListVisible.findIndex((item)=>(item === true));
      setRouteData(
        routeData.map((item, id)=>{
          if (index === id) {
            const poiList = item.poiList;
            const exist = poiList.find(element=>poiToTrip.poiId == element.poiId);
            if (!exist) {
              item.poiList = [...poiList, poiToTrip ];
            }
            
          }
          return item;
        })
      );  
    }
  }, [poiToTrip]);

  const onCloseDrawer = () => {
      setVisible(false);
      generateRoute(null);
  };
   
  const onOpenDrawer = () => {
    getRouteData();    
    setVisible(true);
  };


  const getRouteData = ()=>{
    setLoading(true);
    getAllRoutes()
    .then((data) => {
      setRouteData(data);
      setPoiListVisible(data.map((item)=>false));
    })
    .catch((err) => {
      message.error(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const toggleRouteItem = (routeId) => {
    setLoading(true);

    const index = routeData.findIndex((item)=>item.routeId == routeId);
    if (poiListVisible[index] === false) {
      if (routeData[index].poiList === null) {
        getRouteDetailsById(routeId).then((data) => {         
          setRouteData(
            routeData.map((item)=>{
              if (item.routeId===routeId) {
                item.poiList = data.poiList;
              }
              return item;
            })
          );   
          
        }).catch((err) => {
            message.error(err.message);
        }).finally(() => {
            setPoiListVisible(poiListVisible.map((item, id)=>{
              if (index == id) {
                return true;
              } else {
                return false;
              }
            }))
            setLoading(false);
        });
      } else {
        setPoiListVisible(poiListVisible.map((item, id)=>{
          if (index == id) {
            return true;
          } else {
            return false;
          }
        }))
      }       

    } else {
      setPoiListVisible(poiListVisible.map((item, id)=> false))
    }
    
    setLoading(false); 
        
  }
 
  const onRemoveRoute= (routeId)=> {
    setRouteData(routeData.filter(item=>item.routeId !== routeId));
    deleteRoute(routeId);
  }

  const onInputNewRouteName =(data)=>{
      console.log(data.routeName);
      setLoading(true);
      const newRoute = {
        "id": null,
        "name": data.routeName,
        "startAddress": "",
        "endAddress": "",
        "poiList": [],
      };
      setRouteData([...routeData, newRoute]);
      setPoiListVisible([...routeData.map((item)=>false), true]);
      setLoading(false);
      setRouteNameModalVisible(false);
  }
  
  const onCloseRouteNameModal = () => {
    setRouteNameModalVisible(false);
  }

  const onGenerateRoute = (route) => {
    generateRoute(route);
  }

  const onUpdateRoute = (routeName, field, value) => {

    setRouteData(
      routeData.map((item)=>{
        if (item.name===routeName) {
          item[field]=value;
        }
        return item;
      })
    ); 
  }


  const onSaveRoute =(route) => {
    setLoading(true);
    saveRoute(route).catch((err) => {
      message.error(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <div className ='route-position'> 
        <Button type="primary" onClick={onOpenDrawer} size="medium">
          Route
        </Button>
      </div>
      <Drawer
        title="YOUR PLAN"
        onClose={onCloseDrawer}
        visible={visible}
        width={450}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px', zIndex: '10' }}
        className = 'route-drawer'
        getContainer={false}
        maskClosable={false}
        mask={false}
     >
       <List
          style={{ marginTop: 0, marginLeft: 0, paddingLeft: '0px' }}
          loading={loading}
          dataSource={routeData}
          bordered = {true}
          renderItem={(item, id) => (
          <List.Item className="route-item"
          >
            <div className="route-title">
              <Tooltip title="Route details">            
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  style={{fontSize: "medium", fontWeight: "bold", paddingLeft: 0}}
                  onClick={()=>toggleRouteItem(item.routeId)}
                >
                  {item.name}  
                </Button>
              </Tooltip>     
              <Tooltip title="Remove route"> 
                <Button
                  type="primary"
                  icon={<MinusSquareFilled />}
                  onClick={()=>onRemoveRoute(item.routeId)}
                />
                </Tooltip> 
              </div>
              <div className='poi-item'>
                {poiListVisible[id] && (<RoutePOI route={item} generateRoute={onGenerateRoute} saveRoute={onSaveRoute} updateRoute={onUpdateRoute}/>) }              
              </div>
              
          </List.Item>
          )}
        />

        <Button type="dashed" onClick={() => {setRouteNameModalVisible(true)}} width = '200'>
              Add route
        </Button>
        <Modal 
          title ="Input route name"
          visible={routeNameModalVisible}
          onCancel={onCloseRouteNameModal}
          footer={[
              <Form
              name="route-name-input"
              onFinish={onInputNewRouteName}
              style={{
                  width: 300,
                  margin: "auto",
              }}
              >
              <Form.Item
                  name="routeName"
                  rules={[{ required: true, message: "Please input your route name!" }]}
              >
                  <Input placeholder="route name" defaultValue="new route"/>
              </Form.Item>

              <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
              </Form.Item>
              </Form>,]}
          >
        </Modal>
    
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
    </div>
    
  )
}

export default RouteDrawer