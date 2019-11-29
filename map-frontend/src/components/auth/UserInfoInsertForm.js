import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {Row} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

const StyledWrapper = styled.div`
    padding-top: 0px;
`;

const firstLivingArea = ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong'];

const secondLivingArea = {
    seoul: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구',
        '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구',
        '강동구'],
    busan: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '강서구', '해운대구', '사하구',
        '금정구', '연제구', '수영구', '사상구'],
    daegu: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구'],
    incheon: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구'],
    gwangju: ['동구', '서구', '남구', '북구', '광산구'],
    daejeon: ['서구', '중구', '동구', '유성구', '대덕구'],
    ulsan: ['중구', '남구', '동구', '북구'],
    sejong: ['세종특별시'],
};

const getSecondLivingArea = area => {
    switch (area) {
        case 'seoul' :
            return secondLivingArea.seoul;
        case 'busan' :
            return secondLivingArea.busan;
        case 'daegu' :
            return secondLivingArea.daegu;
        case 'incheon' :
            return secondLivingArea.incheon;
        case 'gwangju' :
            return secondLivingArea.gwangju;
        case 'daejeon' :
            return secondLivingArea.daejeon;
        case 'ulsan' :
            return secondLivingArea.ulsan;
        case 'sejong' :
            return secondLivingArea.sejong;
        default :
            return secondLivingArea.sejong;
    }
    ;
};

const getFirstLivingArea = area => {
    switch (area) {
        case 'seoul' :
            return '서울특별시';
        case 'busan' :
            return '부산광역시';
        case 'daegu' :
            return '대구광역시';
        case 'incheon' :
            return '인천광역시';
        case 'gwangju' :
            return '광주광역시';
        case 'daejeon' :
            return '대전광역시';
        case 'ulsan' :
            return '울산광역시';
        case 'sejong' :
            return '세종특별시';
        default :
            return '서울특별시';
    }
};

const UserInfoInsertForm = ({form, onChange}) => {

    const [secondOption, setSecondOption] = useState('seoul');

    const firstLivingAreaSelect = useCallback( e=> {
        setSecondOption(e.target.value);
        onChange(e);
    }, [secondOption]);

    return (
        <StyledWrapper>
            {/*
            <StyledInput name="livingArea" placeholder="사는 지역" value={form.livingArea} onChange={onChange}/>
            <StyledInput name="gender" placeholder="성별" value={form.gender} onChange={onChange}/>
            <StyledInput name="age" placeholder="나이" value={form.age} onChange={onChange}/>
            <StyledInput name="job" placeholder="직업" value={form.job} onChange={onChange}/>
            */}
            <Row>
                <Form inline style={{paddingTop: 10, paddingLeft: 15}}>
                    <Form.Label style={{paddingRight: 85}}>나이</Form.Label>
                    <Form.Control as="select" name="age" onChange={onChange}>
                        <option value={0}>10세 미만</option>
                        {[10, 20, 30, 40, 50, 60, 70, 80].map((value, index) =>
                            (<option key={index} value={value}>{value}대</option>))}
                        <option value={90}>90세 이상</option>
                    </Form.Control>
                </Form>

                <Form inline style={{paddingTop: 10}}>
                    <Form.Label style={{paddingRight: 30, paddingLeft: 40}}>성별</Form.Label>
                    <Form.Control as="select" onChange={onChange} name="gender">
                        <option value='남자'>남자</option>
                        <option value='여자'>여자</option>
                    </Form.Control>
                </Form>
                <Form inline style={{paddingTop: 10}}>
                    <Form.Label style={{paddingRight: 65, paddingLeft: 15}}>사는 곳</Form.Label>
                    <Form.Control as="select" onChange={firstLivingAreaSelect} name="firstLivingArea">
                        {firstLivingArea.map((area, index) => (<option key={index} value={area}>
                            {getFirstLivingArea(area)}</option>))}
                    </Form.Control>
                    <div style={{paddingLeft: 10}}/>
                    <Form.Control as="select" onChange={onChange} name="secondLivingArea">
                        {getSecondLivingArea(secondOption).map((area) =>
                            (<option value={area} key={area}>{area}</option>))}
                    </Form.Control>
                </Form>
            </Row>
        </StyledWrapper>
    )
};

export default UserInfoInsertForm;
