import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import client from "../../lib/api/client";
import {useSelector} from "react-redux";
import CommentEditor from "../../components/map/CommentEditor";

const CommentList = ({info, newComment}) => {
    const [localCommentList, setLocalCommentList] = useState(info);


    return (
        <>
            { newComment && newComment.map((inf, index) => (<li key={index}>{inf.title}</li>))}
            <hr/>
        </>
    )
};

const CommentContainer = ({info, isCloseBox}) => {
    const [localCommentList, setLocalCommentList] = useState(info.commentList);

    useEffect(() => {
        //console.dir(localCommentList);
    }, [localCommentList]);

    useEffect(() => {
        //console.dir(localCommentList);
    }, [setLocalCommentList]);

    return (
        <>
            <CommentList info={info} newComment={localCommentList}/>
            <CommentEditor info={info} setLocalCommentList={setLocalCommentList} isCloseBox={isCloseBox}/>
        </>
    );
};

export default CommentContainer;
