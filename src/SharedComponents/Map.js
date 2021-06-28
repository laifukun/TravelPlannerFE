import React, {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";
import mapStyles from "../styles/mapStyles";
import {searchByRange} from '../Utils/searchUtils';
import { message } from "antd";

const libraries = ["places"];
const mapContainerStyle = {
    // overflow: "hidden !important" ,
    // lineHeight: 1.35,
    // whiteSpace: "nowrap",
    width: '100vw',
    height: '87.2vh',
};

const imageStyle = {
    alt: "img",
    float: 'left',
    width: 100
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 40.748440,
    lng: -73.985664,
};


function Map({searchData}) {
    const[selectedPOI, setSelectedPOI] = useState(null);
    const [position, setPosition] = useState({
        lat: 40.748440,
        lng: -73.985664
      });

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });

    function handleLoad(map) {
        mapRef.current = map;
      }
    
      function handleCenterChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        setPosition(newPos);
        console.log(newPos)
      }

    const [RangeData, setRangeData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        searchByRange(position.lat, position.lng)
            .then((data) => {
                setRangeData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    });


    const POIdata = searchData ? searchData : RangeData;

   

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    // const panTo = React.useCallback(({lat, lng}) => {
    //     mapRef.current.panTo({lat, lng});
    //     mapRef.current.setZoom(14);
    // }, [])
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
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
                        onClick = {() => {
                            setSelectedPOI(POI);
                        }}
                        // icon = {{
                        //     url: " ",
                        //     scaledSize: new window.google.maps.Size(25, 25)
                        // }}
                    />
                ))}

                <h3>
                Center {center.lat}, {center.lng}
                </h3>
                {selectedPOI && (
                    <InfoWindow
                        position = {{
                            lat: selectedPOI.lat,
                            lng: selectedPOI.lng
                        }}
                        onCloseClick = {() => {
                            setSelectedPOI(null);
                        }}
                    >
                        <div>
                            <div >
                                <img 
                                    src={selectedPOI.imageUrl}
                                    style = {imageStyle}
                                />
                            </div>
                            <div >
                                <b>{selectedPOI.name}</b>
                                <br/>
                                Description: {selectedPOI.description}
                            </div>
                            <button type="button">
                                Show details
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default Map
