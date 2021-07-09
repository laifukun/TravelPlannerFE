import React, { useState, useEffect} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer, Circle } from "@react-google-maps/api";
import mapStyles from "../styles/mapStyles";
import PropTypes from 'prop-types'
import {searchByRange} from '../Utils/searchUtils';
import "../styles/Map.css"
import { Button, Image, Card, message, Rate } from "antd";
import {haversine_distance} from '../Utils/others'
import { CoffeeOutlined } from "@ant-design/icons";
import {ImSpoonKnife} from 'react-icons/im'
import foodIcon from "../asset/food-icon2.png"


const libraries = ["places"];
const mapContainerStyle = {
    // overflow: "hidden !important" ,
    // lineHeight: 1.35,
    // whiteSpace: "nowrap",
    width: '100vw',
    height: '100%',
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const DirectionsPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}


function Map({initCenter, searchData, pickedPOI, routePoints, addPOItoRoute, loadRouteDetails}) {

    const mapRef = React.useRef();
    const[selectedPOI, setSelectedPOI] = useState(null);
    const[center, setCenter] = useState();
    const[showNearBy, setShowNearBy] = useState(true);
    const [POIData, setPOIData] = useState([]);
    const [PlaceData, setPlaceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });
    const [response, setResponse] = useState(null)
    const [directionReq, setDirectionReq]=useState(null);

    function handleLoad(map) {
        mapRef.current = map;
    }
    
    function handleBoundsChanged() {
        if (!mapRef.current) return;

    }

    useEffect(()=>{
        if (!center){
            setCenter(initCenter);
        }

    })

    /* if picked POI is updated from search results or route drawer
    Centerize that POI and show details
    */
    useEffect(()=>{
        if (pickedPOI) {
            onSelectPOI(pickedPOI);
        }
    }, [pickedPOI])

    /* if route points is passed in, generate and show route */
    useEffect(()=>{
        if(routePoints) {
            onGenerateRoute(routePoints);
            setShowNearBy(false);
            setPOIData([]);
            //setPOIData(routePoints.poiList);
        } else {
            if (searchData.length !== 0) {
                setPOIData(searchData);                
            } else {
                setShowNearBy(true);
                getNearbyPOIs();
            }            
            onClearRouteRender();
            setSelectedPOI(null);
            
        }
    }, [routePoints])

    const onSelectPOI = (poi)=> {
        setSelectedPOI(poi);
        setCenter({lat: poi.lat, lng: poi.lng});
    }

    const onGenerateRoute=(routePoints)=> {

        const directReq = {
            origin: routePoints.startAddress,
            destination: routePoints.endAddress,
            travelMode: "DRIVING",
        }
        const waypoints = [];
        routePoints.poiList.forEach (poi => {
            waypoints.push({
                location: {lat: poi.lat, lng: poi.lng},
                stopover: true
            })
        })
        directReq.waypoints = waypoints;
        setDirectionReq(directReq);
    }

    const onClearRouteRender=()=> {
        setResponse(null);
    }

    useEffect( ()=> {

        if(searchData.length !== 0) {
            setPOIData(searchData);
            setShowNearBy(false);
            //onClearRouteRender();
            setSelectedPOI(null);
        } else if (routePoints===null) {         
            setShowNearBy(true);              
            getNearbyPOIs();
        }
    },[searchData])

    const getNearbyPOIs = ()=> {
        if (!mapRef.current) return;
        
        const ne = mapRef.current.getBounds().getNorthEast().toJSON();
        const c = mapRef.current.getCenter().toJSON();

        const radius = haversine_distance(c,ne);

        searchByRange(c.lat, c.lng, radius)
            .then((data) => {
                setPOIData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    
    const directionsCallback = React.useCallback((res) => {
        console.log(res)

        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res)
                
            } else {
                console.log('response: ', res)
            }
            loadRouteDetails(res.routes[0].legs);
        }
    }, [])
/*
    const directionsCallback = (res)=>{
        console.log(res)

        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res)
                loadRouteDetails(res.routes[0].legs);
            } else {
                console.log('response: ', res)
            }
        }
    }
    */
    //let directionsRendererOptions = {
    //    directions: response,
    //}

    const onAddPOItoRoute = (poi)=>{
        addPOItoRoute(poi);
        setSelectedPOI(null);
    }
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div style={{height: "inherit"}}>
            

            <GoogleMap
                
                mapContainerStyle={mapContainerStyle}
                onBoundsChanged={handleBoundsChanged}
                zoom={13}
                center={center}
                options={options}
                onLoad={handleLoad}
                onTilesLoaded={ ()=>{ if (showNearBy)
                 getNearbyPOIs()}}

            >
                
                {POIData.map(POI => (
                    <Marker
                        title={POI.name}
                        lable={POI.name}
                        key = {POI.poiId}
                        position = {{
                            lat: POI.lat,
                            lng: POI.lng
                        }}
                        onClick={() => {
                            onSelectPOI(POI);
                        }}
                        //icon={<ImSpoonKnife />}
                        
                        icon = {POI.imageUrl === "" ? (<ImSpoonKnife />): {
                            url: POI.imageUrl, 
                            scaledSize: new window.google.maps.Size(18, 18),
                            style: {background: 'red', border: '5px'},
                        }}
                        
                        style={{zIndex: 30, border: '5px', borderStyle: 'solid', backgroundColor: 'red'}}
                    />
                ))}

                {selectedPOI && (
                    <InfoWindow
                        position = {{
                            lat: selectedPOI.lat,
                            lng: selectedPOI.lng
                        }}
                        onCloseClick={() => {
                            setSelectedPOI(null);
                        }}
                    >
                        <div className="info-window">
                            <Image 
                                src={selectedPOI.imageUrl}                                    
                                alt={selectedPOI.name}
                                className="info-image"
                             />
                             <div className="card-button">
                             
                             <Card title ={(<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                 {selectedPOI.name} <Rate disabled allowHalf value={selectedPOI.popularity / 2} /></div>)} 
                             bodyStyle={{paddingTop: 0, paddingBottom: 0}}>
                                {selectedPOI.description}                                
                             </Card>
                             <Button type="primary" htmlType="submit" onClick={()=>onAddPOItoRoute(selectedPOI)}>
                                Add to Trip
                            </Button>
                             </div>
                        </div>
                    </InfoWindow>
                )}

                {directionReq && (
                    <DirectionsService
                        options={directionReq}
                        callback={directionsCallback}
                    />
                )}

                {response !== null && (
                    <DirectionsRenderer 
                        options={{directions: response}} 
                        Marker = {
                            {opacity: 0.3}
                        }
                    />
                )}

            </GoogleMap>
        </div>
    );
}

Map.propTypes = DirectionsPropTypes
// export default React.memo(Map)
export default Map
