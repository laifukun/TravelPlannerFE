import React, { Component } from "react";
import {Layout, Button, message} from "antd";
import POIInstruction from  './POIInstruction';
import LoginForm from "../BeforeLogin/LoginForm";
import RegisterForm from "../BeforeLogin/RegisterForm";
import { useState } from "react";
import '../styles/Main.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';
import { getUserInfo } from "../Utils/userUtils";



const { Header, Content, Footer} = Layout;

function Main(props) {
    const [authed, setAuthed] = useState(false);
    const [searchResults, setSearchResults] = useState();
    const [user, setUser] =useState();

    const onLoginSuccess = (username) => {
        
        getUserInfo(username).then((data)=> {
            setUser(data);
        }).catch((err) => {
            message.error(err.message);
        }).finally(()=>{
            setAuthed(true);
        });
        
     }
    
    const onRegisterSuccess = () =>{}

    return (
<<<<<<< HEAD
        <Layout style={{ height: "80vh" }}>

        <Header>
            <div className="header">
                <div className="title">
                Travel Planner
                </div>
                <div >
                    {authed ? ( <p className="welcome"> Welcome <strong> {`${user.firstName}`} </strong> ! </p> ) : (
                    <div className="login-button">
                    <LoginForm onLoginSuccess={onLoginSuccess} />
                    <RegisterForm onSuccess={onRegisterSuccess} />
=======
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
                    <LoginForm onSuccess={() => setAuthed(true)} />
                    <div className="site-drawer-render-in-current-wrapper">
                        {/* 这里填充components */}
                        <KeywordSearch loadSearchResult={(data)=>setSearchResults(data)}/>
                        <Map searchData = {searchResults}/>
>>>>>>> 2ee22a69b84f6cd37ae4ff127f3b04e44528f52f
                    </div>
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