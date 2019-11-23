import React, {useEffect} from 'react';
import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color'
import styled from "styled-components";
import {Row} from "react-bootstrap";

const StyledColor = styled.div`
    padding-top: 5px;
`;

const roadType = ['큰 도로', '작은 도로', '여행로', '음식 추천로', '관광로'];
const colorType = ['0091ff', 'ffea1c', '60fff3', '9aff50', 'ff59c8'];
const type = [
    {roadType: '큰 도로', colorType: '0091ff'},
    {roadType: '작은 도로', colorType: 'ffea1c'},
    {roadType: '여행로', colorType: '60fff3'},
    {roadType: '음식 추천로', colorType: '9aff50'},
    {roadType: '관광로', colorType: 'ff59c8'},
];

class RoadRemarkListItem extends React.Component {

    state = {
        color: {
            a: '1',
        },
    };

    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '60px',
                    height: '20px',
                    background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.state.color.a})`,
                }
            }
        });

        return (
            <Row>
                <StyledColor>
                    <div style={styles.color}/>
                </StyledColor>
                <p>{this.props.text}</p>
            </Row>
        )
    }
}

const StyledRoadRemarkWrapper = styled.div`
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

const getColor = (color) => {
    return ({
        r: (parseInt(color.substring(0, 2), 16).toString(10)),
        g: (parseInt(color.substring(2, 4), 16).toString(10)),
        b: (parseInt(color.substring(4, 6), 16).toString(10))
    });
};

const RemarkList = () => {
    return (
        <>
            {type.map((element, index) => (<RoadRemarkListItem key={index}
                                                               text={element.roadType}
                                                               color={getColor(element.colorType)}/>))}
        </>
    )
};
const RoadRemarkContainer = () => {
    return (
        <StyledRoadRemarkWrapper>
            <RemarkList/>
        </StyledRoadRemarkWrapper>
    )
};

export default RoadRemarkContainer;
