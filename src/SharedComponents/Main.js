import React, { Component } from "react";
import {Layout, Button, message, Modal} from "antd";
import POIInstruction from  './POIInstruction';
import LoginForm from "../BeforeLogin/LoginForm";
import RegisterForm from "../BeforeLogin/RegisterForm";
import Logout from "../AfterLogin/LogOut"
import { useState } from "react";
import '../styles/Main.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';
import { getUserInfo } from "../Utils/userUtils";
import { getAllRoutes, getRouteDetailsById } from "../Utils/routeUtils";



const { Header, Content, Footer} = Layout;

function Main(props) {
    const [authed, setAuthed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [pickedPOI, setPickedPOI] = useState();
    const [user, setUser] =useState();
    const [route, setRoute] = useState();
    const [isStatVisible, setIsStatVisible] = useState(false);
    const [isStaffVisible, setIsStaffVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const initCenter = ({
        lat: 40.748440,
        lng: -73.985664
      });

    const onLoginSuccess = (username) => {        
        getUserInfo(username).then((data)=> {
            setUser(data);
        }).catch((err) => {
            message.error(err.message);
        }).finally(()=>{
            setAuthed(true);
        });   

        getRouteDetailsById(5).then((data)=>{
            setRoute(data);
        }).catch((err) => {
            message.error(err.message);
        }).finally(()=>{
            setAuthed(true);
        }); 
     }
    
    const onRegisterSuccess = () =>{}
    const onLogoutSuccess = ()=> {
        setAuthed(false);
    }

    function showModal(input) {
        if (input === "about"){
            setIsModalVisible(true);
        } else if (input === "stat") {
            setIsStatVisible(true);
        } else {
            setIsStaffVisible(true);
        }
    }
    
    
    const handleOk = (input) => {
        if (input === "about"){
            setIsModalVisible(false);
        } else if (input === "stat") {
            setIsStatVisible(false);
        } else {
            setIsStaffVisible(false);
        }
      };
    
    const handleCancel = (input) => {
        if (input === "about"){
            setIsModalVisible(false);
        } else if (input === "stat") {
            setIsStatVisible(false);
        } else {
            setIsStaffVisible(false);
        }
    };

    return (
        <Layout style={{display: "flex", justifyContent: "space-between", height: "100vh" }}>

            <Header style={{paddingLeft: 0, paddingRight: 0}}>
                <div className="header">
                    <div className="title">
                    Travel Planner
                    </div>
                    <>
                        {authed ? ( <div className="welcome"> 
                                        <div>Welcome <strong> {`${user.firstName}`} </strong> ! </div> 
                                        <Logout onLogoutSuccess={onLogoutSuccess} /> 
                                    </div> ) : (
                        <div className="login-button">
                        <LoginForm onLoginSuccess={onLoginSuccess} />
                        <RegisterForm onSuccess={onRegisterSuccess} />
                        </div>
                        )}
                    </>
                </div>
        </Header>

        <Content> 
        
            <div className="site-drawer-render-in-current-wrapper">
                            {/* 这里填充components */}
                <KeywordSearch 
                    loadSearchResult={(data)=>setSearchResults(data)} 
                    loadSelectedPOI={ (item)=>setPickedPOI(item) }
                />

                <Map 
                    initCenter ={initCenter} 
                    searchData = {searchResults} 
                    pickedPOI={pickedPOI} 
                    routePoints={route}
                />
                
            </div>
        </ Content>

        <Footer className="footer" style = {{paddingLeft: 0, paddingRight: 0}}>
                ©2021 Travel Planner. All Rights Reserved. Developed by FLAG Team 2
                <div style = {{backgroundColor: "#282c34", width: "100vw" }}>
                    <div style = {{display: "inline-block", width: "50%", textAlign: "center"}}> Contact Us: laiTeam2@gmail.com </div>
                    
                    <Button type="primary" onClick={() => showModal("stat")} style = {{width: "50%", backgroundColor: "#282c34", border: "none"}}>Privacy Statement</Button>
                    <Modal visible={isStatVisible} onOk={() => handleOk("stat")} onCancel={() => handleCancel("stat")} style = {{width: "50%"}}>
                    This Privacy Policy explains how TravelPlanner ( “we”or “us”) collects, uses, and discloses information about you. This Privacy Policy applies when you use our websites, mobile applications, and other online products and services that link to this Privacy Policy (collectively, our “Services”), contact our customer service team, engage with us on social media, or otherwise interact with us.
                    We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our website or providing you with a notification). We encourage you to review this Privacy Policy regularly to stay informed about our information practices and the choices available to you.
                    </Modal>
                
                    <Button type="primary" onClick={() => showModal("staff")} style = {{width: "50%", backgroundColor: "#282c34", border: "none"}}>Staff</Button>
                    <Modal visible={isStaffVisible} onOk={() => handleOk("staff")} onCancel={() => handleCancel("staff")} style = {{width: "50%"}}>
                    Fukun Lai;
                    Zheng Xie;
                    Jian Song;
                    Chong Xu;
                    Kun Yu;
                    Yuyang Li;
                    Zhaoru Shang;
                    </Modal>
                    
                    <Button type="primary" onClick={() => showModal("about")} style = {{width: "50%", backgroundColor: "#282c34", border: "none"}}>About Us</Button>
                    <Modal visible={isModalVisible} onOk={() => handleOk("about")} onCancel={() => handleCancel("about")} style = {{width: "50%"}}>
                    Most often, people have some rough ideas of the locations/attractions they want to visit, but they normally have no clear idea how to plan their trip to best suit their schedule and interest. The intent of a travel planner is to provide a tool to fill this gap. Users are able to arrange and plan their trip with travel planner according to their schedule and interest.
                    </Modal>
                </div>
        </Footer>
    </Layout>
    );
  }
  
export default Main;