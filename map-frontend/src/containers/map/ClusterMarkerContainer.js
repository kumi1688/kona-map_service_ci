import React, {useEffect, useState} from 'react';
import {MarkerClusterer, Marker} from "@react-google-maps/api";
import client from "../../lib/api/client";

const ClusterMarkerContainer = ({zoom}) => {
    const [clusterData, setClusterData] = useState(null);

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

    useEffect(() => {
        if (clusterData) clusterData.map(inf => console.dir(inf.position));
    }, [clusterData]);

    if (!clusterData) return null;

    /*
                        [
                            {lat: 37.28212932381519, lng: 127.0421865714111},
                            {lat: 37.28230005426149, lng: 127.04695017462154},
                            {lat: 37.28080184625643, lng: 127.0455950179753},
                            {lat: 37.280464948471455, lng: 127.04434306745907},
                            {lat: 37.285874987195946, lng: 127.04537186254765}
                        ].map(pos => (<Marker position={pos} clusterer={clusterer}/>))
                        */
    return (
        <>
            {zoom <= 13 &&
            <MarkerClusterer
                minimumClusterSize={5}
                averageCenter={true}
                options={{imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"}}>
                {
                    (clus) =>
                        clusterData.map(inf => <Marker key={inf._id} position={inf.position} clusterer={clus}/>)

                }
            </MarkerClusterer>
            }
        </>
    );
};

export default ClusterMarkerContainer;
