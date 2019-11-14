import React, {useCallback, useEffect, useState} from "react";
import {Marker, InfoWindow, Circle} from "@react-google-maps/api";
import {Nav} from 'react-bootstrap';
import CommentContainer from "./CommentContainer";
import schoolIcon from '../../lib/styles/MarkerImage/icons/school.svg';
import stdiumIcon from '../../lib/styles/MarkerImage/icons/stadium.svg';
import smokeIcon from '../../lib/styles/MarkerImage/icons/smoke.png';
import {useSelector} from "react-redux";
import EstimateContainer from "../../containers/map/EstimateContainer";



const InfoWindowList = ({info, zoom}) => {
    const {searchQuery, searchQueryType} = useSelector(({map}) => ({
        searchQueryType: map.searchQuery.searchQueryType,
        searchQuery: map.searchQuery.searchQuery,
    }));
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        switch(searchQueryType){
            case "name": setFilteredData(info.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null)); break;
            case "tag": setFilteredData(info.filter(inf => (inf.tags.indexOf(searchQuery)) !== -1 ? inf : null)); break;
            case "description": setFilteredData(info.filter(inf => (inf.description.indexOf(searchQuery)) !== -1 ? inf : null)); break;
            case "position": setFilteredData(info.filter(inf => (inf.detailedPosition.indexOf(searchQuery)) !== -1 ? inf : null)); break;
            default: setFilteredData(info.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
        }
        console.dir(filteredData);
    }, [searchQuery, searchQueryType]);

    if(!filteredData) return null;

    return (
        <>
            {filteredData.map((inf) => (<InfoWindowItem zoom={zoom} key={inf._id} info={inf}/>))}
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
            icon={zoom > 15 && info.primaryPositionType === 'education' ? smokeIcon : null}/>
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
                    {visibleEstimate && <EstimateContainer/>}
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
