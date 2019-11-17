import React, {useEffect, useState} from 'react';
import UserInfoViewer from "../../components/map/UserInfoViewer";
import client from "../../lib/api/client";
import {finishLoading, startLoading} from "../../modules/loading";

const UserPlaceContainer = ( ) => {
    const [localInfo, setLocalInfo] = useState(null);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await client.get('/api/map');

                setLocalInfo(response.data);
            } catch(e){
                console.log(e);
            }
        };
        if(!localInfo) fetchData();
    }, [localInfo]);

    return(
       <>
           {!localInfo ? <h2>로딩중...</h2> : <UserInfoViewer info={localInfo}/>}
       </>
    );
};

export default UserPlaceContainer;
