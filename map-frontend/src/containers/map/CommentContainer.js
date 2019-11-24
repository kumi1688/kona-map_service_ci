import React, {useCallback, useEffect, useState} from "react";
import CommentEditor from "../../components/map/CommentEditor";

const CommentList = ({info, newComment}) => {
    return (
        <>
            { newComment && newComment.map((inf, index) => (<li key={index}>{inf.title}</li>))}
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
