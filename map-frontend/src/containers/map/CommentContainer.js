import React, {useCallback, useEffect, useState} from "react";
import CommentEditor from "../../components/map/CommentEditor";
import {Button, ListGroupItem, Row, Col, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import client from "../../lib/api/client";

const CommentListItem = ({info, username, setLocalCommentList, newComment, userPlaceId}) => {

    const onRemoveClick = useCallback(() => {
        setLocalCommentList(newComment.filter(item => item._id !== info._id));
        deleteComment();
    }, [newComment]);

    const deleteComment = () => {
        const deleteInnerFunctionComment = async () => {
            try {
                const comment = await client.delete(`/api/comment/deleteComment/${info._id}`);
                const userPlace = await client.patch(`/api/map/userPlace/deleteComment`, {
                    userPlaceId : userPlaceId,
                    commentId : info._id
                });
            } catch (e) {
                console.dir(e);
            }
        };
        deleteInnerFunctionComment();
    };

    return (
        <Row>
            <Col sm={9}>
                <ListGroupItem key={info._id}>{info.title}</ListGroupItem>
            </Col>
            <Col sm={3}>
                {username === info.username && <Button key={info._id} variant="danger"
                                                      onClick={onRemoveClick}>삭제</Button>}
            </Col>
        </Row>
    );
};

const CommentList = ({info, newComment, setLocalCommentList}) => {
    const {username} = useSelector(({user}) => ({
        username: user.user.username
    }));


    return (
        <>
            {newComment && newComment.map((inf) => (
                <CommentListItem info={inf} key={inf._id} username={username}
                                 setLocalCommentList={setLocalCommentList} newComment={newComment}
                                userPlaceId={info._id}/>
            ))}
            <hr/>
        </>
    )
};

const CommentContainer = ({info, isCloseBox, setUpdateCommentList}) => {
    const [localCommentList, setLocalCommentList] = useState(info.commentList);

    useEffect(() => {
        console.dir(info);
    }, [])

    return (
        <>
            <CommentList info={info} newComment={localCommentList} setLocalCommentList={setLocalCommentList}/>
            <CommentEditor info={info} setLocalCommentList={setLocalCommentList}
                           isCloseBox={isCloseBox} setUpdateCommentList={setUpdateCommentList}/>
        </>
    );
};

export default CommentContainer;
