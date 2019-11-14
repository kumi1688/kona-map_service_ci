import React, {useCallback, useState} from 'react';
import {Form, Row, Col, InputGroup, FormControl, Button} from "react-bootstrap";
import {FaSearchengin} from "react-icons/fa";
import {setSearchQuery} from "../../modules/map";
import {useDispatch} from "react-redux";

const MapSearchBox = ({onSearchQuerySubmit}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const onChange = useCallback(
        e => {
            setValue(e.target.value);
        }, [value]
    );

    const onKeyPress = useCallback(
        e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                dispatch(setSearchQuery(value));
                onSearchQuerySubmit();
            }
        }, [value]
    );


    return (
        <>
            <InputGroup className="mb-lg-5" onKeyPress={onKeyPress}>
                <Form.Control
                    placeholder="검색어 입력"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onChange}
                    value={value}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary">
                        <FaSearchengin onClick={onSearchQuerySubmit}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </>
    );
};

export default MapSearchBox;
