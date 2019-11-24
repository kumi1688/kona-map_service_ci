import React, {useEffect, useState} from 'react';
import {MarkerClusterer, Marker} from "@react-google-maps/api";

const ClusterMarkerContainer = ({zoom, info}) => {
    const [clusterData, setClusterData] = useState(null);

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
