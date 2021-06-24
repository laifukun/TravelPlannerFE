import React, { Component } from "react";
import {Layout} from "antd";
import Canvas from  "./Canvas";
import POIInstruction from  './POIInstruction';
import SearchResults from './SearchResults';
import KeywordSearch from './KeywordSearch';
import LoginForm from "../BeforeLogin/LoginForm";
import { useState } from "react";


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
                    <Canvas />
                </ Content>
            )}
        
        </Layout>
      );
  }
  
export default Main;