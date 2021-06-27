import React, { useState, } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import * as POIData from "./POI-data-test.json";
import mapStyles from "../styles/mapStyles";
import PropTypes from 'prop-types'

const libraries = ["places"];
const mapContainerStyle = {
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
    lat: 40.74,
    lng: -73.985664,
};

const DirectionsPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}

function Map() {
    const [selectedPOI, setSelectedPOI] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API,
        libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, [])

    const [response, setResponse] = React.useState(null)
    const [travelMode, setTravelMode] = React.useState('DRIVING')
    const [origin, setOrigin] = React.useState('')
    const [destination, setDestination] = React.useState('')
    const [waypoints, setWaypoints] = React.useState([])
    const originRef = React.useRef()
    const destinationRef = React.useRef()
    const waypointsRef = React.useRef()

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

    const checkDriving = React.useCallback(({ target: { checked } }) => {
        checked && setTravelMode('DRIVING')
    }, [])

    const checkBicycling = React.useCallback(({ target: { checked } }) => {
        checked && setTravelMode('BICYCLING')
    }, [])

    const checkTransit = React.useCallback(({ target: { checked } }) => {
        checked && setTravelMode('TRANSIT')
    }, [])

    const checkWalking = React.useCallback(({ target: { checked } }) => {
        checked && setTravelMode('WALKING')
    }, [])

    const onClick = React.useCallback(() => {
        if (originRef.current.value !== '' && destinationRef.current.value !== '') {
            setOrigin(originRef.current.value)
            setDestination(destinationRef.current.value)
            setWaypoints([{
                location: waypointsRef.current.value,
                stopover: true,
            }])
        }
    }, [])

    const onMapClick = React.useCallback((...args) => {
        console.log('onClick args: ', args)
    }, [])

    let directionsServiceOptions = {
        destination: destination,
        origin: origin,
        waypoints: waypoints,
        travelMode: travelMode,
        optimizeWaypoints: true,
    }

    let directionsRendererOptions = {
        directions: response,
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <div className='map-settings'>
                <hr className='mt-0 mb-3' />

                <div className='row'>
                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='ORIGIN'>Origin</label>
                            <br />
                            <input
                                id='ORIGIN'
                                className='form-control'
                                type='text'
                                ref={originRef}
                            />
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='DESTINATION'>Destination</label>
                            <br />
                            <input
                                id='DESTINATION'
                                className='form-control'
                                type='text'
                                ref={destinationRef}
                            />
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='WAYPOINTS'>Waypoints</label>
                            <br />
                            <input
                                id='WAYPOINTS'
                                className='form-control'
                                type='text'
                                ref={waypointsRef}
                            />
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='DRIVING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'DRIVING'}
                            onChange={checkDriving}
                        />
                        <label className='custom-control-label' htmlFor='DRIVING'>
                            Driving
                        </label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='BICYCLING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'BICYCLING'}
                            onChange={checkBicycling}
                        />
                        <label className='custom-control-label' htmlFor='BICYCLING'>
                            Bicycling
                        </label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='TRANSIT'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'TRANSIT'}
                            onChange={checkTransit}
                        />
                        <label className='custom-control-label' htmlFor='TRANSIT'>
                            Transit
                        </label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='WALKING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'WALKING'}
                            onChange={checkWalking}
                        />
                        <label className='custom-control-label' htmlFor='WALKING'>
                            Walking
                        </label>
                    </div>
                </div>

                <button className='btn btn-primary' type='button' onClick={onClick}>
                    Build Route
                </button>

            </div>

            <GoogleMap
                // id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            // onClick={onMapClick}
            // onLoad={onMapLoad}
            >
                {POIData.features.map(POI => (
                    <Marker
                        key={POI.properties.poiid}
                        position={{
                            lat: POI.geometry.coordinates[1],
                            lng: POI.geometry.coordinates[0]
                        }}
                        onClick={() => {
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
                        position={{
                            lat: selectedPOI.geometry.coordinates[1],
                            lng: selectedPOI.geometry.coordinates[0]
                        }}
                        onCloseClick={() => {
                            setSelectedPOI(null);
                        }}
                    >
                        <div>
                            <div >
                                <img
                                    src={selectedPOI.properties.imageUrl}
                                    style={imageStyle}
                                />
                            </div>
                            <div >
                                <b>{selectedPOI.properties.NAME}</b>
                                <br />
                                Address: {selectedPOI.properties.ADDRESS}
                                <br />
                                Description: {selectedPOI.properties.description}
                            </div>
                        </div>
                    </InfoWindow>
                )}

                {destination !== '' && origin !== '' && (
                    <DirectionsService
                        options={directionsServiceOptions}
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
