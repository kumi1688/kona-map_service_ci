import React, {useCallback, useEffect, useState} from "react";
import {Marker, InfoWindow, Circle} from "@react-google-maps/api";
import {Nav} from 'react-bootstrap';
import CommentContainer from "./CommentContainer";
import schoolIcon from '../../lib/styles/MarkerImage/icons/school.svg';
import stdiumIcon from '../../lib/styles/MarkerImage/icons/stadium.svg';



const InfoWindowList = ({info, zoom}) => {
    return (
        <>
            {info.map((inf) => (<InfoWindowItem zoom={zoom} key={inf._id} info={inf}/>))}
        </>
    );
};

const InfoWindowItem = ({info, zoom}) => {
    const [visible, setVisible] = useState(null);
    const [visiblePositionInfo, setVisiblePositionInfo] = useState(true);
    const [visibleEstimate, setVisibleEstimate] = useState(null);
    const [visibleComment, setVisibleComment] = useState(null);

    const onClick = useCallback(() => {
        if (!visible) setVisible(true);
        else setVisible(false);
    }, [visible]);

    const onTabPosition = useCallback(
        () => {
            setVisibleComment(false);
            setVisibleEstimate(false);
            if (!visiblePositionInfo) setVisiblePositionInfo(true);
            else setVisiblePositionInfo(false);
        }, [visiblePositionInfo]);

    const onTabEstimate = useCallback(
        () => {
            setVisibleComment(false);
            setVisiblePositionInfo(false);
            if (!visibleEstimate) setVisibleEstimate(true);
            else setVisibleComment(false);
        }, [visibleEstimate]);

    const onTabComment = useCallback(
        () => {
            setVisibleEstimate(false);
            setVisiblePositionInfo(false);
            if (!visibleComment) setVisibleComment(true);
            else setVisibleComment(false);
        }, [visibleComment]);

    return (
        <>
            <Marker position={info.position} onClick={onClick}
            icon={zoom > 15 && info.primaryPositionType === 'education' ? schoolIcon : null}/>
            {info.radius !== undefined && visible && <Circle center={info.position} radius={info.radius}/>}
            {visible && <InfoWindow position={info.position}>
                <>
                    <Nav fill justify variant="pills" defaultActiveKey="info-position">
                        <Nav.Item>
                            <Nav.Link eventKey="info-position"
                                      onSelect={onTabPosition}
                            >위치 정보</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="estimate-user"
                                      onSelect={onTabEstimate}
                            >사용자 평가</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="comment-user"
                                      onSelect={onTabComment}
                            >댓글</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr/>
                    {visiblePositionInfo && (
                        <>
                            <h3>이름 : {info.name}</h3>
                            <h3>설명 : {info.description}</h3>
                            <h3>자세한 설명 : {info.detailedPosition}</h3>
                            <h3>위치 타입 : {info.primaryPositionType}, {info.secondaryPositionType}</h3>
                            <h3>태그 : {info.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>
                            <h3>{info.radius === undefined ? "반경 없음" : `반경 ${info.radius} m`}</h3>
                            <p>등록일 : {info.publishingDate}</p>
                        </>
                    )}
                    {visibleEstimate && <h2>estimate</h2>}
                    {visibleComment && <CommentContainer/>}
                </>
            </InfoWindow>}
            {/*
            {visible && <InfoWindow position={position}>
                <>
                    <h3>이름 : {info.name}</h3>
                    <h3>설명 : {info.description}</h3>
                    <h3>자세한 설명 : {info.detailedPosition}</h3>
                    <h3>위치 타입 : {info.primaryPositionType}, {info.secondaryPositionType}</h3>
                    <h3>태그 : {info.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>
                    <h3>{info.radius === undefined ?  "반경 없음": `반경 ${info.radius} m`}</h3>
                    <p>등록일 : {info.publishingDate}</p>
                </>
            </InfoWindow>
            }
            */}
        </>
    );
};

export default InfoWindowList;
