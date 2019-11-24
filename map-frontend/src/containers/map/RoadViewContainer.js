import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {useSelector} from "react-redux";
import client from "../../lib/api/client";
import {InfoWindow, Polyline} from "@react-google-maps/api";
import {Form, Nav} from "react-bootstrap";

import {polylineOptions} from "../../components/map/RoadColor";
import EstimateContainer from "./EstimateContainer";
import CommentContainer from "./CommentContainer";

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
    return {
        lat: road.roadInfo[parseInt(road.roadInfo.length / 2)].lat,
        lng: road.roadInfo[parseInt(road.roadInfo.length / 2)].lng
    };
};

const initialState = {
    visibleOnMouseOver: false,
    visibleInfoWindow: false,
    visibleOnTabPosition: true,
    visibleOnTabEstimate: false,
    visibleOnTabComment: false,
    commentList: [],
};

const RoadViewList = ({roadList}) => {
    return roadList.map(road => (<RoadViewListItem key={road._id} road={road}/>));
};

const roadReducer = (state, action) => {
    switch (action.type) {
        case 'reset' : {
            return initialState
        }
        case 'toggleMouseOverWindow' : {
            return state.visibleOnMouseOver ? {...state, visibleOnMouseOver: false} : {
                ...state,
                visibleOnMouseOver: true
            };
        }
        case 'toggleInfoWindow' : {
            return state.visibleInfoWindow ? {...state, visibleInfoWindow: false} : {...state, visibleInfoWindow: true};
        }
        case 'toggleTabPosition' : {
            return {...state, visibleOnTabPosition: true, visibleOnTabComment: false, visibleOnTabEstimate: false}
        }
        case 'toggleTabEstimate' : {
            return {...state, visibleOnTabEstimate: true, visibleOnTabPosition: false, visibleOnTabComment: false}
        }
        case 'toggleTabComment' : {
            return {...state, visibleOnTabComment: true, visibleOnTabEstimate: false, visibleOnTabPosition: false}
        }
        case 'updateComment' : {
            return {...state, commentList: action.comment};
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const RoadViewListItem = ({road}) => {
    const [localInfo, setLocalInfo] = useReducer(roadReducer, initialState);
    const [loading, setLoading] = useState(false);
    const {username} = useSelector(({user})=> ({
        username: user.user.username,
    }));

    const onRoadClick = useCallback(() => setLocalInfo({type: 'toggleInfoWindow'}), [localInfo]);
    const onMouseOver = useCallback(() => setLocalInfo({type: 'toggleMouseOverWindow'}), [localInfo]);
    const onTabPositionClick = useCallback(() => setLocalInfo({type: 'toggleTabPosition'}), [localInfo]);
    const onTabEstimateClick = useCallback(() => setLocalInfo({type: 'toggleTabEstimate'}), [localInfo]);
    const onTabCommentClick = useCallback(() => setLocalInfo({type: 'toggleTabComment'}), [localInfo]);
    const updateComment = useCallback((value) => setLocalInfo({type: 'updateComment', comment: value}), [localInfo]);
    const onCloseClick = useCallback(() => {
     const uploadComment = async () => {
         setLoading(true);
         try{
            const response = await client.patch(`/api/map/userRoad/comment/${road._id}`, ({
                commentList : localInfo.commentList,
                username: username,
            }));
         }catch(e){
             console.dir(e);
         }
         setLoading(false);
     };
     uploadComment();
    }, [localInfo]);

    return (
        <>
            {localInfo.visibleOnMouseOver && <InfoWindow position={getRoadInfoWindowPosition(road)}>
                <h2>{road.name}</h2>
            </InfoWindow>}
            {localInfo.visibleInfoWindow && <InfoWindow position={getRoadInfoWindowPosition(road)}
            onCloseClick={onCloseClick}>
                <>
                    <Nav fill justify variant="pills" defaultActiveKey="info-position">
                        <Nav.Item>
                            <Nav.Link eventKey="info-position"
                                      onSelect={onTabPositionClick}
                            >위치 정보</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="estimate-user"
                                      onSelect={onTabEstimateClick}
                            >사용자 평가</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="comment-user"
                                      onSelect={onTabCommentClick}
                            >댓글</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr/>
                    {localInfo.visibleOnTabPosition && (
                        <>
                            <h3>이름 : {road.name}</h3>
                            <h3>설명 : {road.description}</h3>
                            <h3>자세한 설명 : {road.detailedPosition}</h3>
                            <h3>위치 타입 : {road.primaryPositionType}, {road.secondaryPositionType}</h3>
                            {road.tags && (<h3>태그 : {road.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>)}
                            <p>등록일 : {road.publishingDate}</p>
                        </>
                    )}
                    {localInfo.visibleOnTabEstimate && <EstimateContainer/>}
                    {localInfo.visibleOnTabComment &&
                    <CommentContainer info={road} setUpdateCommentList={updateComment}/>}
                </>
            </InfoWindow>}
            <Polyline path={road.roadInfo} options={selectPolyLineOption(road)} onMouseOver={onMouseOver}
                      onMouseOut={onMouseOver} onClick={onRoadClick}/>
        </>
    )
};

const RoadViewContainer = ({roadList}) => {
    const [loading, setLoading] = useState(false);

    const {username} = useSelector(({user}) => ({
        username: user.user.username,
    }));

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
