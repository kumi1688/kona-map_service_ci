import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import client from "../../lib/api/client";
import {useSelector} from "react-redux";
import CommentEditor from "../../components/map/CommentEditor";

const CommentList = ({info}) => {
    return (
        <>
            {info.map((inf, index) => (<li key={index}>{inf.title}</li>))}
            <hr/>
        </>
    )
};

const CommentContainer = ({info, isBoxClose}) => {
    const [localcomment, setInfoBoxCommentList] = useState(null);
    const [selectedUserPlace, setSelectedUserPlace] = useState(null);
    const {username} = useSelector(({user}) => ({
        username: user.user.username,
    }));

    useEffect(() => {
        if(!localcomment) setInfoBoxCommentList(info.commentList);
        console.dir(localcomment);
    }, [localcomment]);

    if (!localcomment) return null;

    return (
        <>
            <CommentList info={localcomment}/>
            <CommentEditor info={info} setInfoBoxCommentList={setInfoBoxCommentList} isBoxClose={isBoxClose}/>
        </>
    );
};

export default CommentContainer;
