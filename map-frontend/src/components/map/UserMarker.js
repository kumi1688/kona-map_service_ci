import React, {useCallback, useEffect, useState} from 'react';
import {InfoWindow, Marker} from '@react-google-maps/api';
import MarkerModal from "../common/MarkerModal";

const UserMarker = ({position, circle, setCircle, onKeyPressForRadius, setRadius, radius}) => {
    const [leftClick, setLeftClick] = useState(null);

    const onLeftClick = useCallback(() => {
        if (!leftClick) setLeftClick(true);
        else setLeftClick(false);
    }, [leftClick]);


    return (
        <>
            {leftClick && <MarkerModal onLeftClick={onLeftClick} position={position} radius={radius}
                                       setCircle={setCircle} circle={circle === -1 ? null : circle} />}
            <Marker
                onClick={onLeftClick}
                animation={circle === -1 ? `BOUNCE` : null}
                position={{
                    lat: parseFloat(position.lat),
                    lng: parseFloat(position.lng),
                }}
            >
            </Marker>
        </>
    );
};

export default UserMarker;
