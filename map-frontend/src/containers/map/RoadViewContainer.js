import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import client from "../../lib/api/client";
import {InfoWindow, Polyline} from "@react-google-maps/api";
import {Form} from "react-bootstrap";

import {polylineOptions} from "../../components/map/RoadColor";

const selectPolyLineOption = (road) => {
    let option = null;
    switch (road.primaryPositionType) {
        case "mainRoad" :
            option = polylineOptions.mainRoad;
            break;
        case "smallRoad" :
            option = polylineOptions.smallRoad;
            break;
        case "travelRoad":
            option = polylineOptions.travelRoad;
            break;
        case "foodRoad":
            option = polylineOptions.foodRoad;
            break;
        case "sightSeeingRoad":
            option = polylineOptions.sightSeeingRoad;
            break;
        default :
            option = polylineOptions.mainRoad;
    }
    ;
    return option;
};

const getRoadInfoWindowPosition = (road) => {
    let sum_lat, sum_lng;
    sum_lat = sum_lng = 0;
    road.roadInfo.forEach(function(element){
       sum_lat += element.lat;
       sum_lng += element.lng;
    });

    return {lat : sum_lat / road.roadInfo.length, lng : sum_lng / road.roadInfo.length };
};

const RoadViewList = ({roadList}) => {
    return roadList.map(road => (<RoadViewListItem key={road._id} road={road}/>));
};

const RoadViewListItem = ({road}) => {
    const [visibleOnMouseOver, setVisibleOnMouseOver] = useState(false);
    const onMouseOver = useCallback(
        () => {
            if (!visibleOnMouseOver) setVisibleOnMouseOver(true);
            else setVisibleOnMouseOver(false);
        }, [visibleOnMouseOver]);

    return (
        <>
            {visibleOnMouseOver && <InfoWindow position={getRoadInfoWindowPosition(road)}>
                <h2>{road.name}</h2>
            </InfoWindow>}
            <Polyline path={road.roadInfo} options={selectPolyLineOption(road)} onMouseOver={onMouseOver}
                      onMouseOut={onMouseOver}/>
        </>
    )
};

const RoadViewContainer = ({roadList}) => {
    const [loading, setLoading] = useState(false);

    const {username} = useSelector(({user}) => ({
        username: user.user.username,
    }));

    /*
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await client.get(`/api/map/userRoad/username/${username}`);
                console.dir(response);
                setLocalRoad(response.data);
            } catch (e) {
                console.dir(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    */

    useEffect(() => {
        console.dir(roadList);
    }, [roadList]);

    if (loading) return <h2>로딩중...</h2>;
    if (!roadList) return null;

    return (
        <>
            <RoadViewList roadList={roadList}/>
        </>
    );

};

export default RoadViewContainer;
