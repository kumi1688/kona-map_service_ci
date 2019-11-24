import React, {useCallback, useState} from 'react';
import {GoogleMap, DirectionsService, DirectionsRenderer, LoadScriptNext} from '@react-google-maps/api'

const initialPosition = {lat: 37.284315, lng: 127.044504};

const DirectionContainer = () => {
    const [response, setResponse] = useState(null);
    const [travelMode, setTravelMode] = useState('Walking');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');


    const directionsCallback = useCallback((res) => {
        if (res !== null) {
            if (res.status === 'OK') {
                setResponse(res);
                console.dir(res);
            } else {
                console.dir(res);
            }
        }
    }, [response]);

    const onChangeOrigin = useCallback(
        (e) => {
        setOrigin(e.target.value);
    },[origin]);

    const onChangeDestination = useCallback(
        e => {
            setDestination(e.target.value);
        }, [destination]);


    const checkDriving = useCallback(({target: {checked}}) => {
        checked && setTravelMode('DRIVING');
    }, [travelMode]);

    const checkBicycling = useCallback(({target: {checked}}) => {
        checked && setTravelMode('BICYCLING');
    }, [travelMode]);

    const checkTransit = useCallback(({target: {checked}}) => {
        checked && setTravelMode('TRANSIT');
    }, [travelMode]);

    const checkWalking = useCallback(({target: {checked}}) => {
        checked && setTravelMode('WALKING');
    }, [travelMode]);

    const getOrigin = useCallback((paramOrigin) => {
        setOrigin(paramOrigin);
    }, [origin]);

    const getDestination = useCallback((paramDestination) => {
        setDestination(paramDestination);
    }, [destination]);

    const onClick = useCallback(
        (e) => {
            console.dir(e);
            if (origin !== '' && destination !== '') {
                setOrigin(origin);
                setDestination(destination);
            }
        }, []);

    const onMapClick = useCallback(
        (e) => {
            console.dir(e);
        }, []);

    return (
        <div className='map'>
            <div className='map-settings'>
                <hr className='mt-0 mb-3'/>

                <div className='row'>
                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='ORIGIN'>Origin</label>
                            <br/>
                            <input id='ORIGIN' className='form-control' value={origin}
                            onChange={onChangeOrigin}/>
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='DESTINATION'>Destination</label>
                            <br/>
                            <input id='DESTINATION' className='form-control' value={destination}
                            onChange={onChangeDestination}/>
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
                            onChange={checkDriving}/>
                        < label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
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
                        <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
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
                        <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
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
                        <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
                    </div>
                </div>

                <button className='btn btn-primary' type='button' onClick={onClick}>
                    Build Route
                </button>
            </div>

            <div className='map-container'>
                <LoadScriptNext
                    id="script-loader"
                    googleMapsApiKey="AIzaSyBoLaZLcIzTtGb0Ogg23GTiPkuXs0R-JwE">
                    <GoogleMap
                        // required
                        id='direction-example'
                        // required
                        mapContainerStyle={{
                            height: '300px',
                            width: '100%'
                        }}
                        // required
                        zoom={12}
                        // required
                        center={initialPosition}
                        // optional
                        onClick={onMapClick}
                    >
                        {
                            (destination !== '' && origin !== '') && (
                                <DirectionsService
                                    // required
                                    options={{
                                        destination: destination,
                                        origin: origin,
                                        travelMode: travelMode
                                    }}
                                    // required
                                    callback={directionsCallback}
                                />
                            )
                        }

                        {
                            response !== null && (
                                <DirectionsRenderer
                                    directions={response}
                                    // required
                                    options={{
                                        directions: response
                                    }}
                                />
                            )
                        }
                    </GoogleMap>
                </LoadScriptNext>
            </div>
        </div>
    )
};

export default DirectionContainer;
