import React, {useCallback, useEffect, useReducer} from 'react';
import styled from "styled-components";
import {Button, Col, Nav, Row} from "react-bootstrap";
import CarouselContainer from "./CarouselContainer";
import {useDispatch, useSelector} from "react-redux";
import BasicInfoViewerContainer from "./BasicInfoViewerContainer";
import EstimateContainer from "./EstimateContainer";
import CommentContainer from "./CommentContainer";
import {FaStar, IoIosClose} from "react-icons/all";
import {setInfoViewer} from "../../modules/map";

const StyledWrapper = styled.div`
    z-index: 20;
    background-color : white;
    position: fixed;
    right: 0;
    border-left : 2px solid;
    border-top : 2px solid;
`;

const BottomLine = styled.div`
    padding-top: 5px;
    border-bottom: black solid;
`;

const InfoWindowReducer = (state, action) => {
    switch (action.type) {
        case 'reset' : {
            return initialState
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
        case 'addBookMark' : {
            return {...state, isInBookMark: action.isInBookMark}
        }
        case 'updateFilteredData': {
            return {...state, filteredData: action.filteredData}
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const initialState = {
    visibleOnTabPosition: true,
    visibleOnTabEstimate: false,
    toggleTabComment: false,
    isInBookMark: false,
    commentList: [],
    filteredData : null,
};

const InfoViewerContainer = () => {
    const [localInfo, setLocalInfo] = useReducer(InfoWindowReducer, initialState);
    const {placeInfo, roadInfo, buildingInfo, searchQueryType} = useSelector(({map}) => ({
        searchQueryType: map.searchQuery.searchQueryType,
        roadInfo : map.roadInfo,
        placeInfo: map.placeInfo,
        buildingInfo: map.buildingInfo,
    }));

    const dispatch = useDispatch();
    const toggleTabEstimate = useCallback(() => {
        setLocalInfo({type: 'toggleTabEstimate'})
    }, [localInfo]);
    const toggleTabComment = useCallback(() => {
        setLocalInfo({type: 'toggleTabComment'})
    }, [localInfo]);
    const toggleTabPosition = useCallback(() => {
        setLocalInfo({type: 'toggleTabPosition'})
    }, [localInfo]);
    const updateComment = useCallback((value) =>
        setLocalInfo({type: 'updateComment', comment: value}),
        [localInfo]);
    const updateFilteredData = useCallback((data) => {
        console.dir(data);
        setLocalInfo({type: 'updateFilteredData', filteredData: data});
    },[]);
    const onCloseClick = useCallback(() => {
        dispatch(setInfoViewer(false));
    }, [dispatch]);

    useEffect(() => {
        console.dir(searchQueryType);
        if(searchQueryType === 'place' && placeInfo) updateFilteredData(placeInfo);
        if(searchQueryType === 'road' && roadInfo) updateFilteredData(roadInfo);
        if(searchQueryType === 'building' && buildingInfo) updateFilteredData(buildingInfo);

    }, [placeInfo, roadInfo, buildingInfo, searchQueryType]);

    useEffect(() => {
        console.dir(localInfo.filteredData);
    }, [localInfo.filteredData]);

    if(searchQueryType === 'road' && !localInfo.filteredData) return null;
    if(searchQueryType === 'place' && !localInfo.filteredData) return null;
    if(searchQueryType === 'building' && !localInfo.filteredData) return null;
    if(!localInfo.filteredData) return null;

    return (
        <StyledWrapper>
            <div style={{width: 1000, height: 700}}>
                <Row>
                    <Col>
                        <div style={{width: 500, height: 700}}>
                            <CarouselContainer info={localInfo.filteredData}/>
                        </div>
                    </Col>
                    <Col>
                        <div style={{width: 450, height: 700, paddingBottom: 20}}>
                            <Nav fill justify variant="pills" defaultActiveKey="info-position">
                                <Nav.Item>
                                    <Nav.Link eventKey="info-position"
                                              onSelect={toggleTabPosition}
                                    >위치 정보</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="estimate-user"
                                            onSelect={toggleTabEstimate}
                                    >평가</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="comment-user"
                                            onSelect={toggleTabComment}
                                    >댓글</Nav.Link>
                                </Nav.Item>
                                <Button variant="white" size="xl"><FaStar/></Button>
                                <Button variant="white" onClick={onCloseClick} size="xl"><IoIosClose/></Button>
                            </Nav>
                            <BottomLine/>
                            {localInfo.visibleOnTabPosition && <BasicInfoViewerContainer info={localInfo.filteredData}/>}
                            {localInfo.visibleOnTabEstimate && <EstimateContainer info={localInfo.filteredData}/>}
                            {localInfo.visibleOnTabComment &&
                            <CommentContainer info={localInfo.filteredData} setUpdateCommentList={updateComment}/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </StyledWrapper>
);
};

export default InfoViewerContainer;
