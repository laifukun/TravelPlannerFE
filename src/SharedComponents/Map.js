import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 40.741648, lng: -73.983607, }}
        mapTypeId='roadmap'
        options={{disableDefaultUI: true}}
    >
    {props.isMarkerShown && <Marker position={{ lat: 40.741648, lng: -73.983607, }} />}
    </GoogleMap>
))

export default Map
