import React, {useEffect, useState} from 'react';
import Geolocated from "../components/map/Geolocated";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserLocation} from "../modules/map";

const GeoPage = ({history}) => {
    const [curlocation, setCurLocation] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('셋업됨');
        console.dir(curlocation);
        if(curlocation) {
            dispatch(setCurrentUserLocation(curlocation));
            history.push('/map');
        }
    }, [curlocation]);

    return (
        <>
            {!curlocation && <Geolocated setCurLocation={setCurLocation}/>}
        </>
    );
};

export default GeoPage;
