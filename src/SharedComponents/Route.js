import React, { useState } from 'react';
import { Drawer, Button, Divider } from 'antd';
import '../styles/Route.css';

const RouteMenu = () => {
    // The drawer is invisible by default
    const [isVisible, setIsVisible] = useState(false);
  
    // trigger this function to open the drawer
    const showDrawer = () => {
      setIsVisible(true);
    };
  
    // close the drawer
    const closeDrawer = () => {
      setIsVisible(false);
    };
  
    return (
      <>
        <nav>
          <Button shape="circle" onClick={showDrawer}>
            Route
          </Button>
        </nav>
        <Drawer
          visible={isVisible}
          onClose={closeDrawer}
          width={350}
          placement="right"
          title="My Drawer"
        >
          <p>Menu Item #1</p>
          <Divider />
          <p>Menu Item #2</p>
          <Divider />
          <p>Menu Item #3</p>
          <Divider />
          <p>Menu Item #4</p>
          <Divider />
          <p>Menu Item #5</p>
          <Divider />
          <p>Menu Item #6</p>
          <Divider />
          <p>Menu Item #7</p>
        </Drawer>
      </>
    );
};
export default RouteMenu;