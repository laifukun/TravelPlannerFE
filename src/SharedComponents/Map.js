import React from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow,} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '87.2vh',
};
const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 40.748440,
    lng: -73.985664,
};

function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });

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
            </GoogleMap>
        </div>
    );
}

export default Map
