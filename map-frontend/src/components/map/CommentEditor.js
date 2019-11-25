import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import client from "../../lib/api/client";
import {GoPlus} from 'react-icons/go';
import {useSelector} from "react-redux";

const CommentEditor = ({info, setLocalCommentList, setUpdateCommentList, isCloseBox}) => {
    const [input, setInput] = useState('');
    const [localComment, setLocalComment] = useState(info.commentList);

    const {username} = useSelector(({user}) => ({
        username: user.user.username
    }));

    useEffect(() => {
        //console.log('comment editor'); console.dir(isCloseBox);
        if(isCloseBox) {
            console.log('저장되었습니다');
            saveData();
        }
    }, [isCloseBox]);

    useEffect( () => {
        setUpdateCommentList(localComment);
        setLocalCommentList(localComment);
    }, [localComment]);

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
        }, [input]);

    const onClick = useCallback(
        () => {
            setLocalComment(localComment.concat({
                title: input,
                body: input,
                username: username,
                objectID: info._id,
            }));
            setInput('');
        }, [input]);

    const saveData = useCallback(
        () => {
            const uploadData = async () => {
                try {
                    const response = await client.post(`api/comment/${info._id}`, (
                            localComment
                    ));
                    //console.dir(response.data);
                } catch (e) {
                    console.dir(e);
                }
            };
            uploadData();
        }, [localComment]);

    return (
        <Row>
            <Col xl="auto">
                <InputGroup className="mb-3">
                    <Form.Control
                        size="lg"
                        placeholder="댓글을 입력해주세요"
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
