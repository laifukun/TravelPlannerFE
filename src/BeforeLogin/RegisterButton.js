import React from "react";
import { withRouter } from "react-router";
import {Button} from "antd";

// A simple component that shows the pathname of the current location
function RegisterButton(props) {
    function handleClick() {
        props.history.push('/Register');
    }

    return (
        <Button onClick = {handleClick}> Register </Button>
    );
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.

export default withRouter(RegisterButton);