import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";
import * as POIData from "./POI-data-test.json";
import mapStyles from "../styles/mapStyles";

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

// const textStyle = {
//     textalign: 'left'
// }
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

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });

    const data = searchData ? searchData : [];

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, [])
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <GoogleMap
                // id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
            >
                {data.map(POI => (
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
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}

export default Map
