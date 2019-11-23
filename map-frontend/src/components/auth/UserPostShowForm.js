import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";


const PostListItem = ({post}) => {
    /*
    <th>이름</th>
                <th>설명</th>
                <th>근처 위치</th>
                <th>종류</th>
                <th>세부종류</th>
                <th>태그</th>
                <th>작성일</th>
     */
    return (

        <tr>
            <td>{post.name}</td>
            <td>{post.description}</td>
            <td>{post.detailedPosition}</td>
            <td>{post.primaryPositionType}</td>
            <td>{post.secondaryPositionType}</td>
            <td>
                <ul>
                    {post.tags.map((tag, index) => (<li key={index}>{tag}</li>))}
                </ul>
            </td>
            <td>{post.publishingDate}</td>
        </tr>
    )
};
const PostList = ({postList}) => {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>이름</th>
                <th>설명</th>
                <th>근처 위치</th>
                <th>종류</th>
                <th>세부종류</th>
                <th>태그</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {postList.map(post => (<PostListItem key={post._id} post={post}/>))}
            </tbody>
        </Table>
    )
};
const UserPostShowForm = ({postList}) => {
    return (
        <>
            <PostList postList={postList}/>
        </>
    )
};

export default UserPostShowForm;
