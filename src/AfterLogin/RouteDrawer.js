import { useEffect, useState} from "react";
import { Button, Drawer, List, Modal, message, Input, Form, Tabs, Tooltip} from "antd";
import {DoubleRightOutlined,MinusSquareFilled, MenuOutlined, MediumCircleFill} from "@ant-design/icons";
import '../styles/RouteDrawer.css';
import { getAllRoutes, deleteRoute, deletePlan, savePlan, getRouteDetailsById, getAllUserPlans } from "../Utils/routeUtils";
import TextArea from "antd/lib/input/TextArea";
import SortList from "./DragList";
import Item from "antd/lib/list/Item";



const panes = [
  { id: 1,
    name: 'Plan 1', 
    routes: [{
      name: "route1",
      startAddress: "start 1",
      endAddress: "end 1",
      poiList: [ {
        name: "poi 1",
      }, {
        name: "poi 2",
      },]
    },{
      name: "route2",
      startAddress: "start 2",
      endAddress: "end 2",
      poiList: [ {
        name: "poi 1",
      }, {
        name: "poi 2",
      },]
    }] 
  },
  { id: 2,
    name: 'Plan 2', 
    routes: [{
      routeId: 3,
      name: "route3",
      startAddress: "start 1",
      endAddress: "end 1",
      poiList: [ {
        name: "poi 1",
      }, {
        name: "poi 2",
      },]
    },{
      routeId: 4,
      name: "route4",
      startAddress: "start 2",
      endAddress: "end 2",
      poiList: [ {
        name: "poi 1",
      }, {
        name: "poi 2",
      },]
    }] 
  },
];


const RoutePOI = ({route, generateRoute, saveRoute, updateRoute})=> {

  const onChangeStartAddress=(e)=>{
    updateRoute('startAddress', e.target.value);
  }

  const onChangeEndAddress=(e)=> {
    updateRoute('endAddress', e.target.value);
  }

  return (
    <div style={{paddingLeft: 20, width: "100%"}}>
      <Input defaultValue={route?.startAddress} onChange={onChangeStartAddress}/>

      <SortList poiData={route?.poiList} />

      <Input defaultValue={route?.endAddress}  onChange={onChangeEndAddress}/>
      <div style={{paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <Button type="primary" onClick={()=>generateRoute(route)} width = '100'>
              Generate route
        </Button>        
      </div>
      
    </div>
  );

}

/*
plans =[
  {
    id: ,
    title: ,
    numOfDays: , 
    user: ,
    routes: [
      startAddress: 
      endAddress:
      poiList: []
    ]
  },
  {},
]
*/
const RouteDrawer = ({generateRoute, poiToTrip}) =>{
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const [routeNameModalVisible, setRouteNameModalVisible] = useState(false);
  const [poiListVisible,setPoiListVisible] = useState([]);
  const [plans, setPlans] = useState([]);
  const [activePlan, setActivePlan] = useState("0");
  const [activeRoute, setActiveRoute] = useState();

  useEffect(()=>{
    if (poiToTrip) {
      //const index = poiListVisible.findIndex((item)=>(item === true));

      setPlans(plans.map(
        (plan, id)=>{
        if (activePlan !== id.toString()) return plan;
        plan.routes.map((route,rId)=>{
          if (rId === activeRoute) {
            const poiList = route.poiList;
            const exist = poiList.find(element=>poiToTrip.poiId == element.poiId);
            if (!exist) {
              route.poiList = [...poiList, poiToTrip];
            }
          }
          return route;
        });
        return plan;
      }));

      /*
      setRouteData(
        plans.map((item, id)=>{
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
      */
    }
  }, [poiToTrip]);

  const onCloseDrawer = () => {
      setVisible(false);
      generateRoute(null);
  };
   
  const onOpenDrawer = () => {
    //getRouteData(); 
    setVisible(true);  
    getPlanData(); 
    
  };

  const getPlanData = ()=> {
    setLoading(true);
    getAllUserPlans().then((data) => {
      setPlans(data);      
    }).catch((err) => {
      message.error("You don't have any travel plan");
    }).finally(() => {
      setLoading(false);
    });
  }
  /*
  const getRouteData = ()=>{
    setLoading(true);
    getAllRoutes().then((data) => {
      setRouteData(data);
      setPoiListVisible(data.map((item)=>false));
    }).catch((err) => {
      message.error(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }*/

  const toggleRouteItem = (routeSeq) => {
    setLoading(true);

    //const newActiveRoute = plans[activePlan].routes.findIndex((item)=>item.routeId == routeId);

    if (activeRoute===null || activeRoute !== routeSeq) {
      if (plans[activePlan].routes[routeSeq].poiList === null) {
        getRouteDetailsById(plans[activePlan].routes[routeSeq].routeId).then(
          (data) => {         
          setPlans(plans.map(
              (plan, id)=>{
              if (activePlan !== id.toString()) return plan;
              plan.routes.map((route,rId)=>{
                if (rId == routeSeq) {
                  route.poiList = data.poiList;
                }
                return route;
              });
              return plan;
            }));
            /*
            routeData.map((item)=>{
              if (item.routeId===routeId) {
                item.poiList = data.poiList;
              }
              return item;
            })
            */
 
          
        }).catch((err) => {
            message.error(err.message);
        }).finally(() => {
          /*
            setPoiListVisible(poiListVisible.map((item, id)=>{
              if (index == id) {
                return true;
              } else {
                return false;
              }
            }))
            */
           setActiveRoute(routeSeq);
            setLoading(false);
        });
      } else {
        /*
        setPoiListVisible(poiListVisible.map((item, id)=>{
          if (index == id) {
            return true;
          } else {
            return false;
          }
        }))
        */
        setActiveRoute(routeSeq);
      }       

    } else {
      //setPoiListVisible(poiListVisible.map((item, id)=> false))
      setActiveRoute(null);
    }
    
    setLoading(false); 
        
  }
 
  const onRemoveRoute= (routeSeq)=> {
    const routeId = plans[activePlan].routes[routeSeq].routeId;
    //setRouteData(routeData.filter(item=>item.routeId !== routeId));
    setPlans(plans.map((plan, id)=>{
      if (id.toString() !== activePlan) return plan;
      plan.routes.filter((route,rid)=>rid !== routeSeq);
      return plan;
    }));
    if (routeId) deleteRoute(routeId);
  }

  const onAddNewRoute =(data)=>{
     // console.log(data.routeName);
      setLoading(true);
      const newRoute = {
        "id": null,
        "name": data.routeName,
        "startAddress": "",
        "endAddress": "",
        "poiList": [],
      };
      setPlans(plans.map((plan, id)=>{
        if (id.toString() !== activePlan) return plan;
        plan.routes.push(newRoute);
        return plan;
      }))
      setActiveRoute(plans[activePlan].routes.length-1);
      //setRouteData([...routeData, newRoute]);
      //setPoiListVisible([...routeData.map((item)=>false), true]);
      setLoading(false);
      setRouteNameModalVisible(false);
  }
  
  const onCloseRouteNameModal = () => {
    setRouteNameModalVisible(false);
  }

  const onGenerateRoute = (route) => {
    generateRoute(route);
  }

  const onUpdateRoute = (field, value) => {

    setPlans(plans.map((plan,id)=>{
      if (id.toString() !== activePlan) return plan;
      plan.routes.map((route,rId)=>{
        if (rId === activeRoute) {
          route[field] = value;
        }
        return route;
      });
      return plan;
    }));
    /*
    setRouteData(
      routeData.map((item)=>{
        if (item.name===routeName) {
          item[field]=value;
        }
        return item;
      })
    ); 
    */
  }


  const onSavePlan =(selectedPlan) => {
    setLoading(true);
    savePlan(plans[selectedPlan]).catch((err) => {
      message.error(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  /*
  const onSaveRoute =(route) => {
    setLoading(true);
    saveRoute(route).catch((err) => {
      message.error(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }
*/
  const onPlanTabChange = (pickedPlan) => {
    setActivePlan(pickedPlan);
  }
  const onPlanTabEdit = (targetKey, action) => {
    if(action==="add") {
      addPlan();
    } 
    if (action === "remove") {
      removePlan(targetKey);
    }
  }

  const addPlan=()=>{
    const newPlan = {
      "id": null,
      "name": "New tab",
      "owner": null,
      "routes": [],
    }
    setPlans([...plans,newPlan]);
    setActivePlan((plans.length-1).toString());
    setActiveRoute(0);
  }

  const removePlan=(key)=>{
    setLoading(true);
    const index = parseInt(key);
    const planId = plans[index].planId;
    setPlans(plans.filter((plan, id)=> id !== index));
    if (planId) deletePlan(planId);
    if (index > 0)
      setActivePlan((index-1).toString());
    else if (index < plans.length)
      setActivePlan(index.toString());
    setLoading(false);
  }

  return (
    <div>
      <div className ='route-position'> 
        <Button type="primary" onClick={onOpenDrawer} size="medium">
          Route
        </Button>
      </div>
      <Drawer
        title="Your Traval Plans"
        onClose={onCloseDrawer}
        visible={visible}
        width={500}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px', zIndex: '10' }}
        className = 'route-drawer'
        getContainer={false}
        maskClosable={false}
        mask={false}
     >

        <Tabs
          type="editable-card"
          onChange={onPlanTabChange}
          activeKey={activePlan}
          onEdit={onPlanTabEdit}
        >
          {plans.map((plan, id) => (
            <Tabs.TabPane 
              tab={<Input defaultValue={plan.name}/>} 
              key={id} 
              closable={true}
            >
              {activePlan === id.toString() && (
                <div> <List
                style={{ marginTop: 0, marginLeft: 0, paddingLeft: '0px' }}
                loading={loading}
                dataSource={plan.routes}
                bordered = {true}
                renderItem={(item, id) => (
                <List.Item className="route-item">
                  <div className="route-title">
                    <Tooltip title="Route details">            
                      <Button
                        type="text"
                        icon={<MenuOutlined />}
                        style={{fontSize: "medium", fontWeight: "bold", paddingLeft: 0}}
                        onClick={()=>toggleRouteItem(id)}
                      >
                        {item.name}  
                      </Button>
                    </Tooltip>     
                    <Tooltip title="Remove route"> 
                      <Button
                        type="primary"
                        icon={<MinusSquareFilled />}
                        onClick={()=>onRemoveRoute(id)}
                      />
                      </Tooltip> 
                  </div>
                  <div className='poi-item'>
                      {activeRoute === id && (<RoutePOI route={item} generateRoute={onGenerateRoute} updateRoute={onUpdateRoute}/>) }              
                  </div>                    
                </List.Item>
                )}
              />

              
              </div>)}
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Button type="dashed" onClick={() => {setRouteNameModalVisible(true)}} width = '200'>
                    Add new route
              </Button>
              <Modal 
                title ="Input route name"
                visible={routeNameModalVisible}
                onCancel={onCloseRouteNameModal}
                footer={[
                    <Form
                    name="route-name-input"
                    onFinish={onAddNewRoute}
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
                        <Button type="primary" htmlType="submit"> Confirm </Button>
                    </Form.Item>
                    </Form>,]}
                >
              </Modal>
        <Button type="primary" onClick = {()=>onSavePlan(activePlan)} width = '80'>
              Save Plan
        </Button>
    </Drawer>
    </div>
    
  )
}

export default RouteDrawer