import React, {useCallback, useEffect, useReducer, useState} from "react";
import {Marker, InfoWindow, Circle} from "@react-google-maps/api";
import {Nav} from 'react-bootstrap';
import CommentContainer from "../../containers/map/CommentContainer";
import stadiumIcon from '../../lib/styles/MarkerImage/icons/stadium.svg';
import schoolIcon from '../../lib/styles/MarkerImage/icons/school.svg';
import hostpitalIcon from '../../lib/styles/MarkerImage/icons/hospital.svg';
import cafeIcon from '../../lib/styles/MarkerImage/icons/cafe.svg'
import {useDispatch, useSelector} from "react-redux";
import {updateBookMark} from "../../modules/map";
import EstimateContainer from "../../containers/map/EstimateContainer";
import client from "../../lib/api/client";
import ClusterMarkerContainer from "../../containers/map/ClusterMarkerContainer";
import RoadViewContainer from "../../containers/map/RoadViewContainer";

const findIcon = primaryType => {
    let matchedIcon;
    switch (primaryType) {
        case 'education':
            matchedIcon = cafeIcon;
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
    const [filteredBundleRoad, setFilteredBundleRoad] = useState(null);
    const [filteredBundlePlace, setFilteredBundlePlace] = useState(null);

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
        } else if( searchQueryType === 'road'){ // 경로 검색
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
        } else {
            console.dir(placeInfo);
            console.dir(roadInfo);
            switch (searchQueryOption) {
                case "name":
                    setFilteredBundlePlace(placeInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
                    setFilteredBundleRoad(roadInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "tag":
                    setFilteredBundlePlace(placeInfo.filter(inf => (inf.tags.indexOf(searchQuery)) !== -1 ? inf : null));
                    setFilteredBundleRoad(roadInfo.filter(inf => (inf.tags.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "description":
                    setFilteredBundlePlace(placeInfo.filter(inf => (inf.description.indexOf(searchQuery)) !== -1 ? inf : null));
                    setFilteredBundleRoad(roadInfo.filter(inf => (inf.description.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                case "position":
                    setFilteredBundlePlace(placeInfo.filter(inf => (inf.detailedPosition.indexOf(searchQuery)) !== -1 ? inf : null));
                    setFilteredBundleRoad(roadInfo.filter(inf => (inf.detailedPosition.indexOf(searchQuery)) !== -1 ? inf : null));
                    break;
                default:
                    setFilteredBundlePlace(placeInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
                    setFilteredBundleRoad(roadInfo.filter(inf => (inf.name.indexOf(searchQuery)) !== -1 ? inf : null));
            }
        }
    }, [searchQuery, searchQueryType, searchQueryOption]);

    useEffect(() => {
        console.dir(filteredData);
    }, [filteredData]);

    if (searchQueryType !== 'bundle' && !filteredData) return null;
    if( searchQueryType === 'bundle' && ( !filteredBundlePlace || !filteredBundleRoad)) return null;

    return (
        <>
            {searchQueryType === 'place' && <ClusterMarkerContainer zoom={zoom} info={filteredData}/>}
            {searchQueryType === 'place' && filteredData.map((inf) => (<InfoWindowItem zoom={zoom} key={inf._id} info={inf}/>))}}
            {searchQueryType === 'road' && <RoadViewContainer roadList={filteredData}/>}
            {searchQueryType === 'bundle' && <RoadViewContainer roadList={filteredBundleRoad}/>}
            {searchQueryType === 'bundle' && filteredBundlePlace.map((inf) => (
                <InfoWindowItem zoom={zoom} key={inf._id} info={inf}/>))}
        </>
    );
};

const InfoWindowReducer = (state, action) => {
    switch (action.type) {
        case 'reset' : {
            return initialState
        }
        case 'toggleMouseOverWindow' : {
            return state.visibleMarkerMouseOver ? {...state, visibleMarkerMouseOver: false} : {
                ...state,
                visibleMarkerMouseOver: true
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
        case 'toggleCloseBox' : {
            return {...state, isCloseBox: action.isCloseBox};
        }
        case 'setLoading' : {
            return {...state, loading: action.loading};
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
    visibleMarkerMouseOver : false,
    visibleOnTabPosition : true,
    visibleOnTabEstimate :false,
    toggleTabComment : false,
    commentList : [],
    visibleInfoWindow : false,
    isCloseBox: true,
    loading : false,
    isInBookMark : false,
};

const InfoWindowItem = ({info, zoom}) => {
    const [localInfo, setLocalInfo] = useReducer(InfoWindowReducer, initialState);
    const {username, isAddBookMark, buildingList, roadList, placeList} = useSelector(({user, map}) => ({
        username : user.user.username,
        isAddBookMark : map.isAddBookMark,
        buildingList : map.bookMark.buildingList,
        roadList : map.bookMark.roadList,
        placeList : map.bookMark.placeList
    }));
    const dispatch = useDispatch();

    const toggleMarKerMouseOver = useCallback(() => {setLocalInfo({type: 'toggleMouseOverWindow'})}, [localInfo]);
    const toggleInfoWindow = useCallback(() => {setLocalInfo({type: 'toggleInfoWindow'})}, [localInfo]);
    const toggleTabEstimate = useCallback(() => {setLocalInfo({type: 'toggleTabEstimate'})}, [localInfo]);
    const toggleTabComment = useCallback(() => {setLocalInfo({type: 'toggleTabComment'})}, [localInfo]);
    const toggleTabPosition = useCallback(() => {setLocalInfo({type: 'toggleTabPosition'})}, [localInfo]);
    const setLoading = useCallback((value) => {setLocalInfo({type: 'setLoading', loading: value})}, [localInfo]);
    const updateComment = useCallback((value) => setLocalInfo({type: 'updateComment', comment: value}), [localInfo]);
    const updateLocalBookMark = useCallback((value) => {setLocalInfo({type: 'addBookMark', isInBookMark: value})}, [localInfo]);

    const addInfoToBookMark = useCallback(() => {
        if(!localInfo.isInBookMark && isAddBookMark) {
            updateLocalBookMark(true);
            let updatePlace = placeList;
            updatePlace = updatePlace.concat(info);
            dispatch(updateBookMark({buildingList : buildingList, roadList : roadList, placeList : updatePlace}));
        }
    }, [isAddBookMark]);

    useEffect(() => {
        console.dir(localInfo.isInBookMark);
    }, [localInfo.isInBookMark]);

    const onCloseClick = useCallback(() => {
        const uploadComment = async () => {
            setLoading(true);
            try{
                const response = await client.patch(`/api/map/userPlace/comment/${info._id}`, ({
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

    if (!info) return null;

    return (
        <>
            {localInfo.visibleMarkerMouseOver && <InfoWindow
                position={adjustMouseOverPosition(info.position, zoom)}>
                <h2>{info.name}</h2>
            </InfoWindow>}
            <Marker position={info.position} onClick={toggleInfoWindow}
                    icon={zoom > 13 ? findIcon(info.primaryPositionType) : null}
                    visible={zoom <= 13 ? false : true}
                    onMouseOver={toggleMarKerMouseOver}
                    onMouseOut={toggleMarKerMouseOver}
                    draggable={true}/>
            {info.radius !== undefined && localInfo.visibleInfoWindow &&
            <Circle center={info.position} radius={info.radius}/>}
            {localInfo.visibleInfoWindow && <InfoWindow position={adjustMouseOverPosition(info.position, zoom)} onCloseClick={onCloseClick}>
                <>
                    <Nav fill justify variant="pills" defaultActiveKey="info-position">
                        <Nav.Item>
                            <Nav.Link eventKey="info-position"
                                      onSelect={toggleTabPosition}
                            >위치 정보</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="estimate-user"
                                      onSelect={toggleTabEstimate}
                            >사용자 평가</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="comment-user"
                                      onSelect={toggleTabComment}
                            >댓글</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="bookMark"
                                      onSelect={addInfoToBookMark}
                                      >즐겨찾기추가
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr/>
                    {localInfo.visibleOnTabPosition && (
                        <>
                            <h3>이름 : {info.name}</h3>
                            <h3>설명 : {info.description}</h3>
                            <h3>자세한 설명 : {info.detailedPosition}</h3>
                            <h3>위치 타입 : {info.primaryPositionType}, {info.secondaryPositionType}</h3>
                            <h3>태그 : {info.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>
                            {info.radius && <h3>{info.radius === undefined ? "반경 없음" : `반경 ${info.radius} m`}</h3>}
                            <p>등록일 : {info.publishingDate}</p>
                        </>
                    )}
                    {localInfo.visibleOnTabEstimate && <EstimateContainer/>}
                    {localInfo.visibleOnTabComment && <CommentContainer info={info} setUpdateCommentList={updateComment}/>}
                </>
            </InfoWindow>}
        </>
    );
};

export default InfoWindowList;
