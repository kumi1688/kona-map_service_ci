import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {list} from "../../modules/map";
import UserInfoViewer from "../../components/map/UserInfoViewer";
import client from "../../lib/api/client";
import {finishLoading, startLoading} from "../../modules/loading";

const UserPlaceContainer = () => {
    const [localInfo, setLocalInfo] = useState(null);

    const dispatch = useDispatch();
    const {info, loading} = useSelector(({map, loading}) => ({
        map: map,
        info: map.info,
        loading: loading['map/LIST'],
    }));

    useEffect( () => {
        const fetchData = async () => {
            dispatch(startLoading());
            try{
                const response = await client.get('/api/map');
                //dispatch(list());
                setLocalInfo(response.data);
            } catch(e){
                console.log(e);
            }
            dispatch(finishLoading());
        };
        fetchData();
        console.dir(localInfo);
    }, []);

    if (!info || loading ) return null;

    return(
       <>
           {loading ? <h2>로딩중...</h2> : <UserInfoViewer loading={loading} info={localInfo}/>}
       </>
    );
};

export default UserPlaceContainer;
