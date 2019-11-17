import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import client from "../../lib/api/client";
import {GoPlus} from 'react-icons/go';
import {useSelector} from "react-redux";

const CommentEditor = ({info}) => {
    const [input, setInput] = useState('');
    const [localCommentList, setLocalCommentList] = useState(info.commentList);
    let comment_id = 1;

    const {username} = useSelector(({user}) => ({
        username: user.user.username
    }));

    useEffect(() => {
        console.dir(username);
    }, [username]);

    useEffect(() => {
        console.dir(localCommentList);
    }, [localCommentList]);


    const onChange = useCallback(
        e => {
            setInput(e.target.value);
        }, []);

    const onKeyPress = useCallback(
        e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                onClick();
            }
        }, []);

    const onClick = useCallback(
        e => {
            const uploadData = async () => {
                try {
                    const response = await client.post('/api/comment/:ItemObjectId', ({
                        title: input,
                        body: input,
                        username: username,
                        objectID: info._id,
                    }));
                } catch (e) {
                    console.dir(e);
                }
            };
            uploadData();
        }, [input]);


    return (
        <Row>
            <Col xl="auto">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="댓글을 입력해주세요"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onKeyPress={onKeyPress}
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
