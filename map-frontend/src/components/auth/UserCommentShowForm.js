import React from 'react';
import {Table} from "react-bootstrap";

const CommentList = ({commentList}) => {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>원 글</th>
                <th>글 내용</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {commentList.map(comment => (<CommentListItem key={comment._id} comment={comment}/>))}
            </tbody>
        </Table>
    );
};

const CommentListItem = ({comment}) => {
    return (
        <tr>
            <td>{comment.title}</td>
            <td>{comment.body}</td>
            <td>{comment.publishingDate}</td>
        </tr>
    )
};

const UserCommentShowForm = ({commentList}) => {
    return(
        <CommentList commentList={commentList}/>
    )
};

export default UserCommentShowForm;
