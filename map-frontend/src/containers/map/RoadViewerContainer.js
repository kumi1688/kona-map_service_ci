import React, {useCallback, useReducer} from 'react';
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
};

const RoadViewerContainer = () => {
    const [localInfo, setLocalInfo] = useReducer(InfoWindowReducer, initialState);
    const {roadInfo} = useSelector(({map}) => ({
        roadInfo: map.roadInfo
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
    const onCloseClick = useCallback(() => {
        dispatch(setInfoViewer(false));
    }, []);

    if(!roadInfo) return null;

    return (
        <StyledWrapper>
            <div style={{width: 1000, height: 400}}>
                <Row>
                    <Col>
                        <div style={{width: 500, height: 400}}>
                            <CarouselContainer info={roadInfo}/>
                        </div>
                    </Col>
                    <Col>
                        <div style={{width: 450, height: 400, paddingBottom: 20}}>
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
                                <Button variant="white"><FaStar/></Button>
                                <Button variant="white" onClick={onCloseClick}><IoIosClose/></Button>
                            </Nav>
                            {localInfo.visibleOnTabPosition && <BasicInfoViewerContainer info={roadInfo}/>}
                            {localInfo.visibleOnTabEstimate && <EstimateContainer info={roadInfo}/>}
                            {localInfo.visibleOnTabComment &&
                            <CommentContainer info={roadInfo} setUpdateCommentList={updateComment}/>}
                        </div>
                    </Col>
                </Row>
            </div>
        </StyledWrapper>
    );
};

export default RoadViewerContainer;
