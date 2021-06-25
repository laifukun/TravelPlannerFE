import React, { Component } from "react";
import {Layout} from "antd";
import Canvas from  "./Canvas";
import POIInstruction from  './POIInstruction';
import LoginForm from "../BeforeLogin/LoginForm";
import { useState } from "react";
import '../styles/Main.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';


const { Content } = Layout;

function Main() {
    const [authed, setAuthed] = useState(false);
    
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
                    <LoginForm onSuccess={() => setAuthed(true)} />
                    <div className="site-drawer-render-in-current-wrapper">
                        {/* 这里填充components */}
                        <KeywordSearch />
                        <Map />
                    </div>
                </ Content>
            )}
        
        </Layout>
      );
  }
  
export default Main;