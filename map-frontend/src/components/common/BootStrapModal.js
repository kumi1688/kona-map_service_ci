import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";


const BootStrapModal = ({text, onSubmit, info}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () => {
        console.dir(info);
    }, []);

    const submitAndClose = (e) => {
        handleClose();
        onSubmit(e);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                등록
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>입력 정보 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>이름 : {info.name}</div>
                    <div>설명 : {info.description}</div>
                    <div>위도 : {info.gridPosition.lat}</div>
                    <div>경도 : {info.gridPosition.lng}</div>
                    <div>상세한 위치 : {info.detailedPosition}</div>
                    <div>태그 : {info.tags.map((inf, index) => (<li key={index}>{inf}</li>))}</div>
                    <div>{text}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={submitAndClose}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BootStrapModal;
