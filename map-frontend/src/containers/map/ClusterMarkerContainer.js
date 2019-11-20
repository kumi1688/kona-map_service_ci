import React, {useEffect, useState} from 'react';
import {MarkerClusterer, Marker} from "@react-google-maps/api";
import client from "../../lib/api/client";

const ClusterMarkerContainer = ({zoom, info}) => {
    const [clusterData, setClusterData] = useState(null);

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get(`/api/map`);
                setClusterData(response.data);
                console.dir(response.data);
            } catch (e) {
                console.dir(e);
            }
        };
        fetchData();
    }, []);
    */

    useEffect(() =>{
        console.dir(info);
    }, [info]);

    if (!info) return null;

    return (
        <>
            {zoom <= 13 &&
            <MarkerClusterer
                minimumClusterSize={5}
                averageCenter={true}>
                {
                    (clus) =>
                        info.map(inf => <Marker visible={false} key={inf._id} position={inf.position} clusterer={clus}/>)

                }
            </MarkerClusterer>
            }
        </>
    );
};

export default ClusterMarkerContainer;
