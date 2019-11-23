import React, {useCallback, useEffect, useState} from 'react';
import {InfoWindow, Marker} from '@react-google-maps/api';
import MarkerModal from "../common/MarkerModal";
import AlertComponent from "../common/AlertComponent";

const UserMarker = ({position, circle, setCircle, onKeyPressForRadius, setRadius, radius, animation}) => {
    const [leftClick, setLeftClick] = useState(null);
    const [alertStatus, setAlertStatus] = useState(false);

    const onLeftClick = useCallback(() => {
        if (!leftClick) setLeftClick(true);
        else setLeftClick(false);
    }, [leftClick]);

    return (
        <>
            {alertStatus && <AlertComponent text="등록되었습니다"/>}
            {leftClick && <MarkerModal onLeftClick={onLeftClick} position={position} radius={radius}
                                       setCircle={setCircle} circle={circle === -1 ? null : circle}
                                        setAlertStatus={setAlertStatus}/>}
            <Marker
                onClick={onLeftClick}
                animation='BOUNCE'
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
