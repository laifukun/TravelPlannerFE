import * as React from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

const ExampleDirectionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 0,
  lng: -180,
}

function ExampleDirections({ styles }) {
  const [response, setResponse] = React.useState(null)
  const [travelMode, setTravelMode] = React.useState('DRIVING')
  const [origin, setOrigin] = React.useState('')
  const [destination, setDestination] = React.useState('')
  const originRef = React.useRef()
  const destinationRef = React.useRef()

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
    }
  }, [])

  const onMapClick = React.useCallback((...args) => {
    console.log('onClick args: ', args)
  }, [])

  const directionsServiceOptions = React.useMemo(() => {
    return {
      destination: destination,
      origin: origin,
      travelMode: travelMode,
    }
  }, [])

  const directionsRendererOptions = React.useMemo(() => {
    return {
      directions: response,
    }
  }, [])

  return (
    <div className='map'>
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

      <div className='map-container'>
        <GoogleMap
          id='direction-example'
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onMapClick}
        >
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
    </div>
  )
}

ExampleDirections.propTypes = ExampleDirectionsPropTypes

export default React.memo(ExampleDirections)