import React, {useEffect, useState} from "react";
import {InfoBox, InfoWindow} from '@react-google-maps/api';
import client from "../../lib/api/client";
import list from '../../modules/map'
import {useDispatch, useSelector} from "react-redux";
import InfoWindowList from "../../components/map/InfoWindowList";


const UserInfoOnMapContainer = ({zoom}) => {
    const [localInfo, setLocalInfo] = useState(null);
    const [visible, setVisible] = useState(null);
    const dispatch = useDispatch();
    const {map, info, loading} = useSelector(({map, loading}) => ({
        loading: loading['map/LIST'],
        info: map.info,
    }));

    const onClick = () => {
        if(!visible) setVisible(true);
        else setVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/api/map');
                setLocalInfo(response.data);
            } catch (e) {
                console.dir(e);
            }
        };
        fetchData();
        return() => {
            setLocalInfo(null);
            console.log('clean');
        }
    }, []);

    if (!localInfo) return null;

    return (
        <>
            <InfoWindowList info={localInfo} zoom={zoom}/>
        </>
    );
};

export default UserInfoOnMapContainer;
