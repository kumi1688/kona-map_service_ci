import React, {useCallback, useState} from 'react';
import {Button, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import styled from "styled-components";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {useDispatch} from "react-redux";
import {setRoadTypeOnMap} from "../../modules/map";

const StyledDropDown = styled.div`
    z-index : 20;
    position: fixed;
    background-color : white;
    right: 0;
    margin : 20px 20px 20px 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: dashed black;
`;

const getTitle = (select) => {
    switch (select) {
        case 'mainRoad' :
            return '큰 도로';
        case 'smallRoad' :
            return '작은 도로';
        case 'travelRoad' :
            return '여행로';
        case 'foodRoad' :
            return '음식 추천로';
        case 'sightSeeingRoad' :
            return '관광로';
        default :
            return '큰 도로';
    }
    ;
};

const RoadDropDownButton = ({addRoadInfo}) => {
    const [select, setSelect] = useState('');
    const dispatch = useDispatch();
    const onSelect = useCallback(
        eventKey => {
            setSelect(eventKey);
            dispatch(setRoadTypeOnMap(eventKey));
        }, [select]);

    return (
        <StyledDropDown>
            <Row>
                <Dropdown onSelect={onSelect}>
                    <DropdownButton id="dropdown-basic-button" title={getTitle(select)}>
                        <Dropdown.Item eventKey="mainRoad">큰 도로</Dropdown.Item>
                        <Dropdown.Item eventKey="smallRoad">작은 도로</Dropdown.Item>
                        <Dropdown.Item eventKey="travelRoad">여행로</Dropdown.Item>
                        <Dropdown.Item eventKey="foodRoad">음식 추천로</Dropdown.Item>
                        <Dropdown.Item eventKey="sightSeeingRoad">관광로</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
                <Button variant="outline-primary" onClick={addRoadInfo}>경로 저장하기</Button>
            </Row>
        </StyledDropDown>
    )
};

export default RoadDropDownButton;
