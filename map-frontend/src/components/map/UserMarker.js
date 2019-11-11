import React, {useEffect} from 'react';
import {Marker} from '@react-google-maps/api';

import bank from '../../lib/styles/MarkerImage/icons/bank.svg';


const UserMarker = ({position}) => {


    return (
        <Marker
            position={{
                lat: parseFloat(position.lat),
                lng: parseFloat(position.lng),
            }}
        >
        </Marker>
    );
};

export default UserMarker;
