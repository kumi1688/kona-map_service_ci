import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {list} from "../../modules/map";
import UserInfoViewer from "../../components/map/UserInfoViewer";
import client from "../../lib/api/client";
import {finishLoading, startLoading} from "../../modules/loading";

const UserPlaceContainer = () => {
    const [localInfo, setLocalInfo] = useState(null);
    const [temp, setTemp] = useState(null);

    const dispatch = useDispatch();
    const {map, info, loading} = useSelector(({map, loading}) => ({
        map: map,
        info: map.info,
        loading: loading['map/LIST'],
    }));
    const data1 = [
        {title: "123"},
        {title: "234"},
        {title: "345"},
    ];

    useEffect( () => {
        const fetchData = async () => {
            dispatch(startLoading());
            try{
                const response = await client.get('/api/map');
                dispatch(list());
                setLocalInfo(response.data);
            } catch(e){
                console.log(e);
            }
            dispatch(finishLoading());
        };
        fetchData();
    }, []);

    if (!info || loading ) return null;

    return(
       <>
           {loading ? <h2>로딩중...</h2> : <UserInfoViewer loading={loading} info={localInfo}/>}
       </>
    );
};

export default UserPlaceContainer;
