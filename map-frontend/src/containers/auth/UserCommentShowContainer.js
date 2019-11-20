import React, {useEffect, useState} from 'react';
import client from "../../lib/api/client";
import {useSelector} from "react-redux";
import UserCommentShowForm from "../../components/auth/UserCommentShowForm";
import styled from "styled-components";

const StyledUserCommentWrapper = styled.div`
    padding-left : 60px;
`;

const UserCommentShowContainer = () => {
    const [commentList, setCommentList] = useState(null);
    const [loading, setLoading] = useState(false);
    const {username} = useSelector(({user}) => ({
        username: user.user.username,
    }));

    useEffect(() => {
        const fetchComment = async () => {
            setLoading(true);
            try {
                const response = await client.get(`/api/comment/${username}`);
                setCommentList(response.data);
            } catch (e) {
                console.dir(e);
            }
            setLoading(false);
        };
        fetchComment();
    }, []);

    useEffect(() => {
        console.dir(commentList);
    }, [commentList]);

    useEffect(() => {
        console.dir(username);
    }, [username]);

    if (loading) return (<h2>로딩중</h2>);
    if (!commentList) return null;

    return (
        <StyledUserCommentWrapper>
            <UserCommentShowForm commentList={commentList}/>
        </StyledUserCommentWrapper>
    )
};

export default UserCommentShowContainer;
