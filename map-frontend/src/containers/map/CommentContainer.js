import React, {useCallback, useEffect, useState} from "react";
import CommentEditor from "../../components/map/CommentEditor";
import {ListGroupItem} from "react-bootstrap";

const CommentList = ({info, newComment}) => {
    return (
        <>
            { newComment && newComment.map((inf, index) => (<ListGroupItem key={index}>{index}.{inf.title}</ListGroupItem>))}
            <hr/>
        </>
    )
};

const CommentContainer = ({info, isCloseBox, setUpdateCommentList}) => {
    const [localCommentList, setLocalCommentList] = useState(info.commentList);

    return (
        <>
            <CommentList info={info} newComment={localCommentList}/>
            <CommentEditor info={info} setLocalCommentList={setLocalCommentList}
                           isCloseBox={isCloseBox} setUpdateCommentList={setUpdateCommentList}/>
        </>
    );
};

export default CommentContainer;
