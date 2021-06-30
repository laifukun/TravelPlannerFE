<<<<<<< HEAD
//import '../styles/Header.css'
import { Button, Form, Input, message } from "antd";
=======
import '../styles/Header.css'
import RouteDrawer from '../AfterLogin/RouteDrawer';
>>>>>>> fe0dbcbd4dc13e2f7a82354965c562935a8128a2

function Header(props) {

    return (
<<<<<<< HEAD
            <header className="App-header">
                <p className="title">
                    Travel Planner
                </p>
                <div className="login-button">
                    <Button type="primary" htmlType="submit">
                    Login
                    </Button>
                    <Button type="primary" htmlType="submit" style={{marginLeft: "30px"}}>
                    Registe
                    </Button>
                </div>
            </header>
            
=======
        <header className="header" style={{display: "flex", justifyContent: "space-between"}}>
            <p className="title">
              Travel Planner
            </p>
        </header>
>>>>>>> fe0dbcbd4dc13e2f7a82354965c562935a8128a2
    )
}

export default Header

