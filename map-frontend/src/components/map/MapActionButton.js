import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MapActionButtons = ({onCancel, onPublish}) => {
    return (
        <>
            <Button variant="outline-success" onClick={onPublish}> 정보 등록</Button>
            <Button variant="outline-danger" onClick={onCancel}> 취소</Button>
        </>
    );
};

export default MapActionButtons;
