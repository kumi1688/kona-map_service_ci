import React, {useCallback, useEffect, useState} from "react";
import {Marker, InfoWindow, Circle} from "@react-google-maps/api";
import {Nav} from 'react-bootstrap';
import CommentContainer from "../../containers/map/CommentContainer";
import stadiumIcon from '../../lib/styles/MarkerImage/icons/stadium.svg';
import schoolIcon from '../../lib/styles/MarkerImage/icons/school.svg';
import hostpitalIcon from '../../lib/styles/MarkerImage/icons/hospital.svg';
import {useSelector} from "react-redux";
import EstimateContainer from "../../containers/map/EstimateContainer";
import client from "../../lib/api/client";
import ClusterMarkerContainer from "../../containers/map/ClusterMarkerContainer";
import RoadViewContainer from "../../containers/map/RoadViewContainer";

const findIcon = primaryType => {
    let matchedIcon;
    switch (primaryType) {
        case 'education':
            matchedIcon = schoolIcon;
            break;
        case 'excercise':
            matchedIcon = stadiumIcon;
            break;
        case 'hospital' :
            matchedIcon = hostpitalIcon;
            break;
        default :
            matchedIcon = schoolIcon;
    }
    ;
    return matchedIcon;
};

const adjustMouseOverPosition = (position, zoom) => {
    let customPosition = {lat: null, lng: position.lng};
    switch (zoom) {
        case 15 :
            customPosition.lat = position.lat + 0.0015;
            break;
        case 16 :
            customPosition.lat = position.lat + 0.001;
            break;
        case 17 :
            customPosition.lat = position.lat + 0.0005;
            break;
        case 18 :
            customPosition.lat = position.lat + 0.0003;
            break;
        case 19 :
            customPosition.lat = position.lat + 0.0001;
            break;
        case 20 :
            customPosition.lat = position.lat + 0.0001;
            break;
        case 21 :
        case 22:
        case 23:
        case 24:
        case 25:
            customPosition.lat = position.lat;
            break;
        default :
            customPosition.lat = position.lat;
            break;
    }
    return customPosition;
};

const InfoWindowList = ({placeInfo, roadInfo, zoom}) => {
    const {searchQuery, searchQueryType, searchQueryOption} = useSelector(({map}) => ({
        searchQueryType: map.searchQuery.searchQueryType,
        searchQuery: map.searchQuery.searchQuery,
        searchQueryOption: map.searchQuery.searchQueryOption
    }));
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        //console.dir(info);
        if (searchQueryType === 'place') {
            switch (searchQueryOption) {
                case "name":
                    setFilteredData(placeInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "tag":
                    setFilteredData(placeInfo.filter(inf => (inf.tags.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "description":
                    setFilteredData(placeInfo.filter(inf => (inf.description.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "position":
                    setFilteredData(placeInfo.filter(inf => (inf.detailedPosition.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                default:
                    setFilteredData(placeInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
            }
        } else { // 경로 검색
            switch (searchQueryOption) {
                case "name":
                    setFilteredData(roadInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "tag":
                    setFilteredData(roadInfo.filter(inf => (inf.tags.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "description":
                    setFilteredData(roadInfo.filter(inf => (inf.description.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "position":
                    setFilteredData(roadInfo.filter(inf => (inf.detailedPosition.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                default:
                    setFilteredData(roadInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
            }
        }
    }, [searchQuery, searchQueryType, searchQueryOption]);

    useEffect(() => {
        console.dir(filteredData);
    }, [filteredData]);

    if (!filteredData) return null;

    return (
        <>
            <ClusterMarkerContainer zoom={zoom} info={filteredData}/>
            {searchQueryType === 'road' ? <RoadViewContainer roadList={filteredData}/> :
            filteredData.map((inf) => (<InfoWindowItem zoom={zoom} key={inf._id} info={inf}/>))}
        </>
    );
};

const InfoWindowItem = ({info, zoom}) => {
    const [loading, setLoading] = useState(false);
    const [updateCommentList, setUpdateCommentList] = useState(null);
    const [isCloseBox, setIsCloseBox] = useState(true);
    const [localInfo, setLocalInfo] = useState(null);
    const [visible, setVisible] = useState(null);
    const [visibleMarkerMouseOver, setVisibleMarkerMouseOver] = useState(null);
    const [visiblePositionInfo, setVisiblePositionInfo] = useState(true);
    const [visibleEstimate, setVisibleEstimate] = useState(null);
    const [visibleComment, setVisibleComment] = useState(null);

    const onClick = useCallback(() => {
        if (!visible) {
            setVisible(true);
            setIsCloseBox(null);
        } else {
            setVisible(null);
            setIsCloseBox(true);
        }
    }, [visible]);

    const onCloseClick = useCallback(() => {
        setVisibleEstimate(false);
        setVisibleComment(false);
        setVisiblePositionInfo(true);
        if (!isCloseBox) {
            setIsCloseBox(true);
            setVisible(null);
            if (info.commentList !== updateCommentList) updateComment();
        } else {
            setIsCloseBox(false);
            setVisible(null);
        }
    }, [updateCommentList]);

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

    const updateComment = useCallback(
        e => {

            const saveData = async () => {
                setLoading(true);
                try {
                    console.dir(updateCommentList);
                    await client.post(`/api/comment/${info._id}`, (updateCommentList));
                } catch (e) {
                    console.dir(e);
                }
                setLoading(false);
            };
            saveData();
        }, [updateCommentList]);

    const onMouseOver = useCallback(() => {
        if (visibleMarkerMouseOver) setVisibleMarkerMouseOver(false);
        else setVisibleMarkerMouseOver(true);
    }, [visibleMarkerMouseOver]);

    useEffect(() => {
        if (!localInfo) setLocalInfo(info);
    }, [info]);

    if (!localInfo) return null;

    return (
        <>
            {visibleMarkerMouseOver && <InfoWindow
                position={adjustMouseOverPosition(localInfo.position, zoom)}>
                <h2>hello</h2>
            </InfoWindow>}
            <Marker position={localInfo.position} onClick={onClick}
                    icon={zoom > 13 ? findIcon(localInfo.primaryPositionType) : null}
                    visible={zoom <= 13 ? false : true}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOver}
                    draggable={true}/>
            {localInfo.radius !== undefined && visible &&
            <Circle center={localInfo.position} radius={localInfo.radius}/>}
            {visible && <InfoWindow position={localInfo.position} onCloseClick={onCloseClick}>
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
                            <h3>이름 : {localInfo.name}</h3>
                            <h3>설명 : {localInfo.description}</h3>
                            <h3>자세한 설명 : {localInfo.detailedPosition}</h3>
                            <h3>위치 타입 : {localInfo.primaryPositionType}, {localInfo.secondaryPositionType}</h3>
                            <h3>태그 : {localInfo.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>
                            <h3>{localInfo.radius === undefined ? "반경 없음" : `반경 ${localInfo.radius} m`}</h3>
                            <p>등록일 : {localInfo.publishingDate}</p>
                        </>
                    )}
                    {visibleEstimate && <EstimateContainer/>}
                    {visibleComment && <CommentContainer info={localInfo} isCloseBox={isCloseBox}
                                                         setUpdateCommentList={setUpdateCommentList}/>}
                </>
            </InfoWindow>}
        </>
    );
};

export default InfoWindowList;
