import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const UserMarker = ({position}) => {
    return (
        <Marker
            position={{
                lat: position.lat,
                lng: position.lng,
            }}
        />
    );
};

export default UserMarker;
