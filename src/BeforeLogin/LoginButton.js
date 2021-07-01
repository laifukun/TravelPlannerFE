import React from "react";
import { withRouter } from "react-router";
import {Button} from "antd";

// A simple component that shows the pathname of the current location
function LoginButton(props) {
    function handleClick() {
        props.history.push('/Login');
    }

    return (
        <Button onClick = {handleClick}> Log In </Button>
    );
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.

export default withRouter(LoginButton);