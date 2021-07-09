import { useEffect, useState} from "react";
import { Button, Drawer, List, Form, message, Input, InputNumber, Tabs, Tooltip} from "antd";
import {DeleteFilled,  MenuFoldOutlined, MenuUnfoldOutlined, SaveOutlined, PlusOutlined, NodeIndexOutlined, HomeFilled, ClearOutlined, CloseOutlined} from "@ant-design/icons";
import '../styles/RouteDrawer.css';
import { deletePOIFromRoute, deleteRoute, deletePlan, savePlan, updatePlan, getRouteDetailsById, getAllUserPlans, generatePlan } from "../Utils/routeUtils";
import {searchNearbyPlaces} from "../Utils/searchUtils"
import SortList from "./DragList";
import TitleEditorModal from "./TitleEditorModal"
import DeleteButton from "../SharedComponents/DeleteButton";
import {ImSpoonKnife} from 'react-icons/im'
import {MdHotel} from 'react-icons/md'
import {GrClose, GrOptimize} from 'react-icons/gr'
import {GiJourney} from 'react-icons/gi'

const RoutePOI = ({route, generateRoute, updateRoute, removePOI, routeDetails, loadSortedPOI, showNearbyFood, showNearbyHotel})=> {


  const onChangeStartAddress=(e)=>{
    updateRoute('startAddress', e.target.value);
  }

  const onChangeEndAddress=(e)=> {
    updateRoute('endAddress', e.target.value);
  }

  const getTotalTravelTime = () =>{
    let totalTime = 0;
    if (route && routeDetails) {
      route.poiList.forEach(poi=>{
        totalTime += poi.estimateVisitTime;
      });
      routeDetails.forEach(r =>{
        totalTime += r.duration.value/3600;
      });
    };
    
    return Math.floor(totalTime) + ' hr ' + Math.floor((totalTime - Math.floor(totalTime))*60) + ' min' ;

  }

  return (
    <div style={{paddingLeft: 20, width: "100%"}}>
      <Tooltip title="Origin Address" > 
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
          <HomeFilled /> <Input defaultValue={route?.startAddress} onChange={onChangeStartAddress}/>
        </div>
      </Tooltip>

      <SortList poiData={route?.poiList} removePOI={removePOI} routeInfo={routeDetails} loadSortedData={loadSortedPOI}/>

      <Tooltip title="Destination Address" > 
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
        <HomeFilled /><Input defaultValue={route?.endAddress}  onChange={onChangeEndAddress}/>
        </div>
      </Tooltip>

      {routeDetails && ( <div style={{paddingTop: '15px'}}> <h3>Total Travel & Visiting Time: {getTotalTravelTime()} </h3> </div>)}

      <div style={{paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <Tooltip title ={"Generate and show current route"}>
        <Button type="primary" onClick={()=>generateRoute(route)} width = '80' icon={<NodeIndexOutlined />} size = 'small'>
              Generate
        </Button>  
        </Tooltip> 

        <Tooltip title ={"Clear current route"}>
        <Button type="primary" onClick={()=>generateRoute(null)} width = '80' icon={<ClearOutlined />} size = 'small'>
              Clear
        </Button>  
        </Tooltip>

        <Tooltip title ={"Show Restaurant nearby current route"}>
        <Button type="primary" onClick={()=>showNearbyFood(route)} width = '70' icon={<ImSpoonKnife />} size = 'small'>
              <span style={{paddingLeft: '3px'}}>Food</span>
        </Button> 
        </Tooltip>
        <Tooltip title ={"Show Hotel nearby current route"}>
        <Button type="primary" onClick={()=>showNearbyHotel(route)} width = '70' icon={<MdHotel />} size = 'small'>
              <span style={{paddingLeft: '3px'}}>Hotel</span>
        </Button>  
        </Tooltip>   
      </div>
      
    </div>
  );

}

const RouteDrawer = ({generateRoute, showNearbyPlaces, poiToTrip, routeDetails, authed}) =>{
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeExpand, setRouteExpand] = useState(false);
  const [plans, setPlans] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [activePlan, setActivePlan] = useState("0");
  const [activeRoute, setActiveRoute] = useState();

  useEffect(()=>{
    if (poiToTrip) {
      setRouteInfo(null);
      generateRoute(null);
      if (plans.length===0) {
        message.error("Please create a plan and a route first !");
        return;
      }
      setPlans(plans.map(
        (plan, id)=>{
        if (activePlan !== id.toString()) return plan;
        plan.routes.map((route,rId)=>{
          if (rId === activeRoute) {
            const poiList = route.poiList;
            const exist = poiList.find(element=>poiToTrip.poiId === element.poiId);
            if (!exist) {
              route.poiList = [...poiList, poiToTrip];
            }
          }
          return route;
        });
        return plan;
      }));
    }
  }, [poiToTrip]);

  useEffect(()=>{
    if (authed) {
      if (plans.length > 0) {
        //const curPlan = plans;
        setLoading(true);
        getAllUserPlans().then((data) => {
          //curPlan.push([...data]);
          //curPlan = [...data, ...curPlan];
          setPlans([...data,...plans]);      
        }).catch((err) => {
          message.error("You don't have any travel plan");
        }).finally(() => {
          setLoading(false);
        });
      } else {
        getPlanData();
      }
    } else {
      setPlans([]);
      setRouteInfo(null);
      setActivePlan(null);
      setActiveRoute();
    }
  }, [authed]);

  useEffect(()=> {

    setRouteInfo(routeDetails);
  }, [routeDetails])

  const onCloseDrawer = () => {
      setVisible(false);
      generateRoute(null);
      showNearbyPlaces([]);
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

  const getRouteRestaurant = (route) =>{
    setLoading(true);
    searchNearbyPlaces(route, 'restaurants').then((data) => {
      showNearbyPlaces(data);      
    }).catch((err) => {
      message.error("Fail to get restaurant information");
    }).finally(() => {
      setLoading(false);
    });
  }

  const getRouteHotel = (route) =>{
    setLoading(true);
    searchNearbyPlaces(route, 'hotels').then((data) => {
      showNearbyPlaces(data);      
    }).catch((err) => {
      message.error("Fail to get hotel information");
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
    

    if (activeRoute===null || activeRoute !== routeSeq) {
      setRouteInfo(null);
      if (plans[activePlan].routes[routeSeq].poiList === null) {
        setLoading(true);
        getRouteDetailsById(plans[activePlan].routes[routeSeq].routeId).then(
          (data) => {         
          setPlans(plans.map(
              (plan, id)=>{
              if (activePlan !== id.toString()) return plan;
              plan.routes.map((route,rId)=>{
                if (rId === routeSeq) {
                  route.poiList = data.poiList;
                }
                return route;
              });
              return plan;
            }));

        }).catch((err) => {
            message.error(err.message);
        }).finally(() => {
           setActiveRoute(routeSeq);
            setLoading(false);
        });
      } else {
        setActiveRoute(routeSeq);
      }       

    } else {
      setActiveRoute(null);
    }
    setRouteExpand(!routeExpand);
    //setLoading(false); 
        
  }
 
  const onRemoveRoute= (routeSeq)=> {
    const routeId = plans[activePlan].routes[routeSeq].routeId;
    setPlans(plans.map((plan, id)=>{
      if (id.toString() === activePlan){
        plan.routes = plan.routes.filter((route,rid)=>rid !== routeSeq);
      }
      
      return plan;
    }));
    
    if (routeId)  {
      setLoading(true);
      deleteRoute(routeId).then().finally(setLoading(false));
    }
  }

  const onRemovePOI= (poiSeq)=> {
    const routeId = plans[parseInt(activePlan)].routes[activeRoute].routeId;
    const poiId = plans[parseInt(activePlan)].routes[activeRoute].poiList[poiSeq].poiId;
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
    const data = {
      "poiId": poiId,
      "routeId": routeId,
      "seqNo": poiSeq,
    };
    if (routeInfo) {
      generateRoute(null);
      setRouteInfo(null);
    }
    setLoading(true);
    deletePOIFromRoute(data).then().finally(setLoading(false));
    //updateRoute(plans[activePlan].routes[activeRoute]);
  }

  const onAddNewRoute =()=>{
    if (plans.length===0 ) {
      message.info("Please create a plan first!");
      return;
    };
      setLoading(true);
      const newRoute = {
        "id": null,
        "name": "New Route",
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
      setLoading(false);
  }

  const onGenerateRoute = (route) => {
    generateRoute(route);
  }

  const onUpdateRouteField = (field, value) => {

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
    setRouteInfo(null);
  }


  const onSavePlan =(selectedPlan) => {
    if (!authed) {
      message.info("Please Login!");
      return;
    }
    setLoading(true);

    if (plans[selectedPlan].planId) {
      updatePlan(plans[selectedPlan]).then( (data)=>{
        setPlans(plans.map((plan, id)=>{
          if (id.toString() !== activePlan) return plan;
          plan=data;
          return plan;
        }));
        }).catch((err) => {
        message.error(err.message);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      savePlan(plans[selectedPlan]).then( (data)=>{
        setPlans(plans.map((plan, id)=>{
          if (id.toString() !== activePlan) return plan;
          plan=data;
          return plan;
        }));
        }).catch((err) => {
        message.error(err.message);
      }).finally(() => {
        setLoading(false);
      });
    }
    
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
    setActiveRoute(null);
    setRouteInfo(null);
    generateRoute(null);
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
      "name": "New Plan",
      "owner": null,
      "routes": [],
    }
    const newRoute = {
      "id": null,
      "name": "New Route",
      "startAddress": "",
      "endAddress": "",
      "poiList": [],
    };
    const planLen = plans.length;
    setPlans([...plans,newPlan]);
    setActivePlan(planLen.toString());
    setActiveRoute(null);
    setRouteInfo(null);
    generateRoute(null);
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

    setRouteInfo(null);
    setLoading(false);
  }

  const onChangePlanName=(newName, planSeq)=>{
    setLoading(true);
    setPlans(plans.map((plan,id)=>{
      if (id !== planSeq) return plan;
      plan['name'] = newName;
      return plan;
    }));
    setLoading(false);
  }

  const onChangeRouteName=(newName, routeSeq)=>{
    setLoading(true);
    setPlans(plans.map((plan,id)=>{
      if (id.toString() === activePlan){
        plan.routes.map((route,rId)=>{
          if (rId === routeSeq) {
            route['name'] = newName;
          }
          return route;
        });
      }
      return plan;
    }));
    setLoading(false);
  }
  const onGeneratePlan = (data)=> {
    if (data.maxHours >= 24 || data.maxHours <= 0) {
      message.info("Please input correct Hours");
      return;
    }
    //console.log(data)
    generateRoute(null);
    setRouteInfo(null);
    if (activePlan) {
      generatePlan(plans[parseInt(activePlan)], data.maxHours).then((data) => {
        setPlans(plans.map((plan, id)=>{
          if (id.toString() === activePlan) return data;
          return plan;
        }));      
      }).catch((err) => {
        message.error("Failed to generate plan");
      }).finally(() => {
        setLoading(false);
      });
    } else {
      message.error("You haven't selected a plan");
    }  
  }

  const onChangePOIOrder =(sortedPOI)=>{
    setRouteInfo(null);
    generateRoute(null);
    setPlans(plans.map(
      (plan, id)=>{
      if (activePlan !== id.toString()) return plan;
      plan.routes.map((route,rId)=>{
        if (rId === activeRoute) {
            route.poiList = [...sortedPOI];
        }
        return route;
      });
      return plan;
    }));
  }

  return (
    <>
      <div className ='route-position'> 
        <Button type="primary" onClick={onOpenDrawer} size="medium" icon ={<GiJourney />}>
          <span style={{paddingLeft: '10px'}}>Your Travel Plans</span>
        </Button>
      </div>
      <Drawer
        title="Your Traval Plans"
        onClose={onCloseDrawer}
        visible={visible}
        width={500}
        placement='right'
        style={{ position: 'absolute', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px', zIndex: '10'}}
        className = 'route-drawer'
        getContainer={false}
        maskClosable={false}
        mask={false}
        footer={          
            <Form
              name="generate_route"
              onFinish={onGeneratePlan}
              initialValues={{
                maxHours: 8
              }}
              style={{display: 'flex', justifyContent:'space-around', alignContent: 'center'}}
            >  
            <Form.Item>
                <Button type="primary" htmlType="submit" witdh ='100%' icon={<GrOptimize value={{color: 'white'}}/>}>
                  <span style={{paddingLeft: '10px'}}>Optimize Your Plan</span>
                </Button>
              </Form.Item>

              <div style={{display: 'flex'}}>
              <Form.Item label="" name="maxHours"> 
                <InputNumber  min={1} max={24} defaultValue={8} style={{width: "55px"}}/> 
              </Form.Item> 
              <Form.Item>
              <span><strong> Hours/Day</strong></span>
              </Form.Item>
              </div>

            </Form>
        }
     >
       
        <Tabs
          type="editable-card"
          onChange={onPlanTabChange}
          activeKey={activePlan}
          onEdit={onPlanTabEdit}
          addIcon={<Tooltip title="Add New Plan"><PlusOutlined /></Tooltip> }
          tabBarGutter={0}          
        >
          
          {plans.map((plan, id) => (
            <Tabs.TabPane 
              tab={plan.name} 
              key={id} 
              closable={true}
              closeIcon={<DeleteButton
                  type="text"
                  icon={<CloseOutlined />}
                  deleteAction={()=>removePlan(id)}
                />}
            >
              <div style={{display: 'flex', justifyContent:'space-between', paddingBottom: 10}}>
                <TitleEditorModal buttonText="Rename Plan" setNewName={(newName)=>onChangePlanName(newName,id)}>
                </TitleEditorModal>
                <Button type="primary" onClick = {()=>onSavePlan(activePlan)} width = '80' size='small' icon={<SaveOutlined />}>
                  Save Plan
                </Button>
              </div>
              
              {activePlan === id.toString() && (
                <div> 
                  <List
                style={{ marginTop: 0, marginLeft: 0, paddingLeft: '0px' }}
                loading={loading}
                dataSource={plan.routes}
                bordered = {true}
                renderItem={(item, rId) => (
                <List.Item className="route-item">
                  <div className="route-title">
                      <div>        
                      <Button
                        type="text"
                        icon={routeExpand ? (<Tooltip title="Route details"> <MenuFoldOutlined style={{color: 'blue'}}/> </Tooltip>) : (<MenuUnfoldOutlined style={{color: 'blue'}}/>)}
                        style={{fontSize: "medium", fontWeight: "bold", paddingLeft: 0}}
                        onClick={()=>toggleRouteItem(rId)}
                      >
                        {item.name}                            
                      </Button>
                      <Tooltip title="Rename Route">
                          <TitleEditorModal setNewName={(newName)=>onChangeRouteName(newName, rId)}>
                          </TitleEditorModal>
                      </Tooltip> 
                      </div>    
                      <DeleteButton
                        type="text"
                        icon={<Tooltip title="Delete Route from Plan"><DeleteFilled style={{color: 'red'}}/></Tooltip>}
                        deleteAction={()=>onRemoveRoute(rId)}
                      />
                  </div>
                  <div className='poi-item'>
                      {activeRoute === rId && (<RoutePOI 
                                route={item} 
                                generateRoute={onGenerateRoute} 
                                updateRoute={onUpdateRouteField}
                                removePOI={seq => onRemovePOI(seq)}
                                routeDetails={routeInfo}
                                loadSortedPOI={(newList)=>onChangePOIOrder(newList)}
                                showNearbyFood={(route)=>getRouteRestaurant(route) }  
                                showNearbyHotel = {(route)=>getRouteHotel(route)}
                                />)}
                                            
                  </div>                    
                </List.Item>
                )}
              />             
              </div>)}
            </Tabs.TabPane>
          ))}
        </Tabs>
        <div style={{textAlign: 'right', width: 'inherit', paddingTop: '10px'}}>
        <Button type="primary" onClick={onAddNewRoute} width = '200' icon={<PlusOutlined />}>
          Add New Route
        </Button> 
        </div>
               
    </Drawer>
    </>
    
  )
}

export default RouteDrawer