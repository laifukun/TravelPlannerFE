import React, { useState, useEffect } from "react";
import { RightOutlined, MenuOutlined, MinusOutlined} from "@ant-design/icons";
import {Collapse, Button} from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import '../styles/RouteDrawer.css';
const { Panel } = Collapse;

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }}/>);

const SortableItem = sortableElement(({ poi }) => (

      <div >
        <div> <DragHandle /> {poi.name} </div>
        
        
      </div>

));

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Collapse
      bordered
      expandIcon={() => (
        <RightOutlined />
      )}
    >
      {children}
    </Collapse>
  );
});

export default function SortList({poiData, removePOI}) {
  const [data, setData] = useState(poiData);

  
  useEffect(()=>{
    if (poiData === null) {
      setData([]);
    } else {
      setData(poiData);
    }      
    
  }, [poiData])
  
  
  const onSortEnd = ({ oldIndex, newIndex }) =>
    setData(arrayMove(data, oldIndex, newIndex));

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle >
      {data?.map((poi, index) => {
        return (
        <div className='poi-item'> 
          <SortableItem key={`item-${index}`} index={index} poi={poi} />
          <Button
            type="primary"
            icon={<MinusOutlined />}
            onClick={()=>removePOI(index)}
          />
        </div>)
      })}
    </SortableContainer>
  );
}
