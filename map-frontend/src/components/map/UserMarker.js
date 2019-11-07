import React from 'react';
import {Marker} from '@react-google-maps/api';

const UserMarker = ({position}) => {
    return (
        <Marker
            position={{
                lat: parseFloat(position.lat),
                lng: parseFloat(position.lng),
            }}
        />
    );
};

export default UserMarker;
