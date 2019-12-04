import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {clearMap} from "../../modules/map";
import {Button} from "react-bootstrap";
import styled from "styled-components";

const StyledBuildingRemarkWrapper = styled.div`
    z-index : 20;
    background-color : white;
    position: fixed;
    right: 0;
    margin : 20px 20px 20px 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border : dashed black;
`;

const BuildingRemarkContainer = () => {
    const {isClearMap} = useSelector(({map}) => ({
        isClearMap : map.isClearMap,
    }));
    const dispatch = useDispatch();

    const onClick = useCallback(
        e => {
            if(!isClearMap) dispatch(clearMap(true));
            else dispatch(clearMap(false));
        }, [isClearMap, dispatch]);

    return (
        <StyledBuildingRemarkWrapper>
            <Button onClick={onClick}>지도초기화</Button>
            <Button variant="outline-primary">건물 저장하기</Button>
        </StyledBuildingRemarkWrapper>
    )
};

export default BuildingRemarkContainer;
