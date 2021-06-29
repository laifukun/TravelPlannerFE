import React, { Component } from "react";
import {Layout, Button} from "antd";
import POIInstruction from  './POIInstruction';
import LoginForm from "../BeforeLogin/LoginForm";
import RegisterForm from "../BeforeLogin/RegisterForm";
import { useState } from "react";
import '../styles/Main.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';
import {HashRouter as Router , Route , Switch} from 'react-router-dom'
import { createBrowserHistory } from "history";
import LoginButtonWithRouter from "../BeforeLogin/LoginButton"
import RegisterButtonWithRouter from "../BeforeLogin/RegisterButton"



const { Content } = Layout;

function Main(props) {
    const [authed, setAuthed] = useState(false);
    const [searchResults, setSearchResults] = useState();



    return (
        <Layout style={{ height: "100vh" }}>
            {authed ? (
              <Content
                    style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overflowY: "auto",
                }}>  This is content!   </Content>
            ) : (
                <Content
                    style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overflowY: "auto",
                }}> 
                    <Router history={createBrowserHistory()}>
                        <Route path="/Login" render={(props) => (<LoginForm {...props} onSuccess={() => setAuthed(true)} />)} />                                             
                        <LoginButtonWithRouter></LoginButtonWithRouter>
                        <Route path="/Register" component = {RegisterForm} />                                             
                        <RegisterButtonWithRouter></RegisterButtonWithRouter>
                    </Router>
                    
                    <div className="site-drawer-render-in-current-wrapper">
                        {/* 这里填充components */}
                        <KeywordSearch loadSearchResult={(data)=>setSearchResults(data)}/>
                        <Map />
                    </div>
                </ Content>
            )}
        
        </Layout>
      );
  }
  
export default Main;