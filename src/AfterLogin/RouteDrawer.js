import { useEffect, useState} from "react";
import { Button, Drawer, List, Modal, message, Input, Form, Tabs, Tooltip} from "antd";
import {DoubleRightOutlined,MinusSquareFilled, MenuOutlined, MediumCircleFill} from "@ant-design/icons";
import '../styles/RouteDrawer.css';
import { updateRoute, deleteRoute, deletePlan, savePlan, getRouteDetailsById, getAllUserPlans, generatePlan } from "../Utils/routeUtils";
import TextArea from "antd/lib/input/TextArea";
import SortList from "./DragList";
import Item from "antd/lib/list/Item";


const RoutePOI = ({route, generateRoute, updateRoute, removePOI})=> {

  const onChangeStartAddress=(e)=>{
    updateRoute('startAddress', e.target.value);
  }

  const onChangeEndAddress=(e)=> {
    updateRoute('endAddress', e.target.value);
  }

  return (
    <div style={{paddingLeft: 20, width: "100%"}}>
      <Input defaultValue={route?.startAddress} onChange={onChangeStartAddress}/>

      <SortList poiData={route?.poiList} removePOI={removePOI}/>

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
    if (plans.length === 0 )
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

  const onRemovePOI= (poiSeq)=> {
    //const routeId = plans[activePlan].routes[routeSeq].routeId;
    //setRouteData(routeData.filter(item=>item.routeId !== routeId));
    setPlans(plans.map((plan, id)=>{
      if (id.toString() !== activePlan) return plan;
      plan.routes.map((route,rId)=>{
        if (rId === activeRoute) {
          const poiList = route.poiList;
          route.poiList = poiList.filter((poi, seq)=>seq !== poiSeq);
        }
        return route;
      })
      //plan.routes[activeRoute].poiList.filter((poi, seq)=>seq !== poiSeq);
      return plan;
    }));
    updateRoute(plans[activePlan].routes[activeRoute]);
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
    const newRoute = {
      "id": null,
      "name": "new Route",
      "startAddress": "",
      "endAddress": "",
      "poiList": [],
    };
    const planLen = plans.length;
    setPlans([...plans,newPlan]);
    setActivePlan(planLen.toString());
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

  const onGeneratePlan = ()=> {
    if (activePlan) {
      generatePlan(plans[parseInt(activePlan)]).then((data) => {
        setPlans(plans.map((plan, id)=>{
          if (id.toString() == activePlan) return data;
          return plan;
        }));      
      }).catch((err) => {
        message.error("Failed to generate plan");
      }).finally(() => {
        setLoading(false);
      });
    } else {
      message.error("You don't select a plan");
    }
    

  }

  return (
    <>
      <div className ='route-position'> 
        <Button type="primary" onClick={onOpenDrawer} size="medium">
          Your Travel Plans
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
                      {activeRoute === id && (<RoutePOI 
                                route={item} 
                                generateRoute={onGenerateRoute} 
                                updateRoute={onUpdateRoute}
                                removePOI={seq => onRemovePOI(seq)}/>) }              
                  </div>                    
                </List.Item>
                )}
              />

              
              </div>)}
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Button type="dashed" onClick={() => {setRouteNameModalVisible(true)}} width = '200'>
                    Add new route manually
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

        <Button type="primary" onClick ={onGeneratePlan} witdh ='100'>
          Generate Plan Automatically
        </Button>
    </Drawer>
    </>
    
  )
}

export default RouteDrawer