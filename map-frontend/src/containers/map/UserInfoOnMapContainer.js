import React, {useEffect, useState} from "react";
import {InfoBox, InfoWindow} from '@react-google-maps/api';
import client from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import InfoWindowList from "../../components/map/InfoWindowList";
import {finishLoading, startLoading} from "../../modules/loading";


const UserInfoOnMapContainer = ({position}) => {
    const [localInfo, setLocalInfo] = useState(null);
    const [visible, setVisible] = useState(null);
    const dispatch = useDispatch();
    const {map, info, loading} = useSelector(({map, loading}) => ({
        loading: loading['map/LIST'],
        info: map.info,
        map: map,
    }));

    const onClick = () => {
        if(!visible) setVisible(true);
        else setVisible(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(startLoading());
            try {
                const response = await client.get('/api/map');
                setLocalInfo(response.data);
                console.dir(response.data);
            } catch (e) {
                console.dir(e);
            }
            dispatch(finishLoading());
        };
        fetchData();
    }, []);

    if (!localInfo || loading ) return null;

    //position={{lat: 37.284315, lng: 127.044504}}
    return (
        <>
            <InfoWindowList info={localInfo}/>
        </>
    );
};

export default UserInfoOnMapContainer;
