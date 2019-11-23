import React, {useEffect, useState} from "react";
import {InfoBox, InfoWindow} from '@react-google-maps/api';
import client from "../../lib/api/client";
import {setCommentList} from '../../modules/map';
import {useDispatch, useSelector} from "react-redux";
import InfoWindowList from "../../components/map/InfoWindowList";
import ClusterMarkerContainer from "./ClusterMarkerContainer";


const UserInfoOnMapContainer = ({zoom}) => {
    const [loading, setLoading]= useState(false);
    const [placeInfo, setPlaceInfo] = useState(null);
    const [roadInfo, setRoadInfo] = useState(null);
    const [visible, setVisible] = useState(null);
    const dispatch = useDispatch();
    const { commentList } = useSelector(({map, loading}) => ({
        commentList : map.commentList
    }));

    const onClick = () => {
        if(!visible) setVisible(true);
        else setVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await client.get('/api/map/userPlace');
                const response2 = await client.get('/api/map/userRoad');
                setPlaceInfo(response.data);
                setRoadInfo(response2.data);
            } catch (e) {
                console.dir(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.dir(commentList);
    }, [commentList]);

    useEffect(() => {
        console.dir(placeInfo);
        if(placeInfo) dispatch(setCommentList(placeInfo));
    }, [placeInfo]);

    if (loading) return <h2>로딩중...</h2>;
    if (!placeInfo) return null;

    return (
        <>
            <InfoWindowList placeInfo={placeInfo} roadInfo={roadInfo} zoom={zoom}/>
        </>
    );
};

export default UserInfoOnMapContainer;
