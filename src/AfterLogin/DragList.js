import React, { useState } from "react";
import { RightOutlined, MenuOutlined} from "@ant-design/icons";
import {Collapse} from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
const { Panel } = Collapse;

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }}/>);

const SortableItem = sortableElement(({ value }) => (
  <Panel
    showArrow
    header={
      <>
        <DragHandle />a
        {value.name}
      </>
    }
  >
    {JSON.stringify(value)}
  </Panel>
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

export default function SortList({routeData}) {
  const [data, setData] = useState(routeData);
  
  const onSortEnd = ({ oldIndex, newIndex }) =>
    setData(arrayMove(data, oldIndex, newIndex));

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {data?.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </SortableContainer>
  );
}
