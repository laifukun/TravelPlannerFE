import React, { useState, useEffect } from "react";
import { StarFilled, HomeFilled, MinusOutlined} from "@ant-design/icons";
import {Collapse, Button, Tooltip} from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import '../styles/RouteDrawer.css';
import DeleteButton from "../SharedComponents/DeleteButton";
const { Panel } = Collapse;

const DragHandle = sortableHandle(({value}) => <Button type='text' icon ={<StarFilled/>} style={{padding: 0, cursor: 'move'}}
>{value}</Button>);

const SortableItem = sortableElement(({ poi }) => (

  <li className='drag-visible'> <DragHandle value={poi.name} ></DragHandle> </li>      

));

const SortableContainer = sortableContainer(( {children} ) => {
  return <div > {children} </div>;
  /*
  return (
    <Collapse
      bordered
      expandIcon={() => (
        <RightOutlined />
      )}
    >
      {...children}
    </Collapse>
  );*/
});

export default function SortList({poiData, removePOI, routeInfo, loadSortedData}) {
  const [data, setData] = useState(poiData);
  const [route, setRoute] = useState(null);
  
  useEffect(()=>{
    if (poiData === null) {
      setData([]);
    } else {
      setData(poiData);
    }      
    
  }, [poiData])
  
  useEffect(()=>{
    setRoute(routeInfo);
  }, [routeInfo])
  
  const onSortEnd = ({ oldIndex, newIndex }) => {
    loadSortedData(arrayMove(data, oldIndex, newIndex));
  }
   // setData(arrayMove(data, oldIndex, newIndex));

  return (
    <SortableContainer 
      onSortEnd={onSortEnd} 
      useDragHandle={false} 
      helperClass='row-dragging'
      transitionDuration={100}
      distance={0}
    >
      {data?.map((poi, index) => {
        return (<>
          <div className='poi-item'> 
            <SortableItem key={`item-${index}`} index={index} poi={poi} />
            <DeleteButton
              type="primary"
              icon={<Tooltip title="Delete POI from Route"><MinusOutlined /></Tooltip>}
              onDelete={()=>removePOI(index)}
            />
          </div>
          <div className="route-info">                    
            {route && (
              <div style={{paddingLeft: 30}}>
                <div> Address: {route[index].end_address} </div>
                <div> Distance: {route[index].distance.text} </div>
                <div> Travel Time: {route[index].duration.text} </div>
                <div> Visiting Time: {Math.floor(poi.estimateVisitTime)} hr {Math.floor((poi.estimateVisitTime - Math.floor(poi.estimateVisitTime))*60)} min</div>
              </div>
            )}
          </div>
       </>   
      )})}
    </SortableContainer>
  );
}
