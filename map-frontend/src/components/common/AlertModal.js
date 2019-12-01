import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Modal, ModalBody, ModalTitle, ModalFooter, Button, Form, ListGroup, Row, Col} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../modules/user";


const AlertModal = ({titleText, bodyText, history}) => {
    const dispatch = useDispatch();
    const onCloseClick = useCallback(() => {
        dispatch(logout());
        history.push('/login');
    }, []);

    return (

        <Modal>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{bodyText}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseClick}>나가기</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>

    );
};

export default withRouter(AlertModal);
