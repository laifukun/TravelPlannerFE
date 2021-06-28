import React, { Component } from "react";
import {Layout, Button, message} from "antd";
import POIInstruction from  './POIInstruction';
import LoginForm from "../BeforeLogin/LoginForm";
import { useState } from "react";
import '../styles/Main.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';


const { Header, Content, Footer} = Layout;

function Main() {
    const [authed, setAuthed] = useState(false);
    const [searchResults, setSearchResults] = useState();
    const [userFirstName, setUserFirstName] =useState();
    const [loginForm, setLoginForm] = useState(false);
    const [registrationForm, setRegistrationForm] = useState(false);

    const onLoginSuccess = (username) => {
        setUserFirstName(username);
        setLoginForm(false);
    }
    

    return (
        <Layout style={{ height: "80vh" }}>

        <Header>
            <div className="header">
                <p className="title">
                Travel Planner
                </p>
                <div className="login-button">
                {authed ? ( "Welcome " + {userFirstName} ) : (
                    <>
                    <LoginForm onLoginSuccess={onLoginSuccess} />
                    <Button type="primary" htmlType="submit" onClick={()=>setRegistrationForm(true)} style={{marginLeft: "30px"}}>
                        Register
                    </Button>
                    </>
                )}
                </div>
            </div>
      </Header>

    <Content> 
    
        <div className="site-drawer-render-in-current-wrapper">
                        {/* 这里填充components */}
            <KeywordSearch loadSearchResult={(data)=>setSearchResults(data)}/>
            <Map />
            
        </div>
    </ Content>

        <Footer>
            ©2021 Travel Planner. All Rights Reserved. Developed by FLAG Team 2
        </Footer>
        </Layout>
    );
  }
  
export default Main;