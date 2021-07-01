import React, { useState, useEffect} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import * as POIData from "./POI-data-test.json";
import mapStyles from "../styles/mapStyles";
import PropTypes from 'prop-types'
import {searchByRange} from '../Utils/searchUtils';
import "../styles/Map.css"
import { Button, Image, Card, message } from "antd";


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


function Map({searchData, pickedPOI, routePoints, addPOI}) {
    const[selectedPOI, setSelectedPOI] = useState(null);
    const [position, setPosition] = useState({
        lat: 40.748440,
        lng: -73.985664
      });
      const [center, setCenter] = useState({
        lat: 40.748440,
        lng: -73.985664
      });

    const [RangeData, setRangeData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });

    const [response, setResponse] = useState(null)
    const [directionReq, setDirectionReq]=useState(null);

    // const [addPOI, setAddPOI] = useState(null);


    function handleLoad(map) {
        mapRef.current = map;
      }
    
    function handleCenterChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        setPosition(newPos);
        console.log(newPos)
    }


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

    useEffect(() => {
        setLoading(true);
        console.log(position);
        searchByRange(position.lat, position.lng, 500)
            .then((data) => {
                setRangeData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [position]);


    // const POIdata = searchData ? searchData : RangeData;
    const POIdata = directionReq ? [] : (searchData ? searchData : RangeData);
   

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, [])



    const directionsCallback = React.useCallback((res) => {
        console.log(res)

        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res)
            } else {
                console.log('response: ', res)
            }
        }
    }, [])

    const onMapClick = React.useCallback((...args) => {
        console.log('onClick args: ', args)
    }, [])

    let directionsRendererOptions = {
        directions: response,
    }

    const onAddPOItoRoute = (poi)=>{
        addPOI(poi);
        console.log(poi);
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div style={{height: "inherit"}}>
            

            <GoogleMap
                // id="map"
                // onLoad={map => setMapRef(map)}
                onLoad={handleLoad}
                mapContainerStyle={mapContainerStyle}
                onCenterChanged={handleCenterChanged}
                zoom={13}
                center={center}
                options={options}
                
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >
                
                {POIdata.map(POI => (
                    <Marker
                        key = {POI.poiId}
                        position = {{
                            lat: POI.lat,
                            lng: POI.lng
                        }}
                        onClick={() => {
                            onSelectPOI(POI);
                        }}
                        icon = {{
                            url: POI.imageUrl,
                            scaledSize: new window.google.maps.Size(50, 50)
                        }}
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
                             <Card title ={selectedPOI.name} bodyStyle={{paddingTop: 0, paddingBottom: 0}}>
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
                    <DirectionsRenderer options={directionsRendererOptions} />
                )}

            </GoogleMap>
        </div>
    );
}

Map.propTypes = DirectionsPropTypes
// export default React.memo(Map)
export default Map
