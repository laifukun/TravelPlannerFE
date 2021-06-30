//import '../styles/Header.css'
import { Button, Form, Input, message } from "antd";

function Header(props) {

    return (
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
            
    )
}

export default Header

