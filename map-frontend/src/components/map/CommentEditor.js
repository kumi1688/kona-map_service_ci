import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import client from "../../lib/api/client";
import {GoPlus} from 'react-icons/go';
import {useSelector} from "react-redux";

const CommentEditor = ({addDataList}) => {
    const [input, setInput] = useState('');
    const {username} = useSelector(({user}) => ({
        username: user.user.username
    }));

    useEffect(() =>{
        console.dir(username);
    }, [username]);

    const onChange = useCallback(
        e => {
            setInput(e.target.value);
        }, []);

    const onClick = useCallback(
        e => {
            console.dir(input);
            const uploadData = async () =>{
                try {
                    const response = await client.post('/api/comment', ({
                        title: input,
                        body: input,
                        username: username
                    }));
                } catch(e){
                    console.dir(e);
                }
            };
            uploadData();
            console.log('등록 완료');
        }, [input]);

    return (
            <Row>
                <Col xl="auto">
                    <InputGroup className="mb-3" >
                        <Form.Control
                            placeholder="댓글을 입력해주세요"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={onChange}
                            value={input}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={onClick}><GoPlus/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>

    );
};

export default CommentEditor;
