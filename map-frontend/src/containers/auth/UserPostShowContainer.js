import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import client from "../../lib/api/client";
import UserPostShowForm from "../../components/auth/UserPostShowForm";
import styled from "styled-components";

const UserPostShowWrapper = styled.div`
    padding-left: 60px;
`;

const UserPostShowContainer = () => {
    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState(null);
    const {username} = useSelector(({user}) => ({
       username : user.user.username,
    }));

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try{
                const response = await client.get(`/api/map/username/${username}`);
                setPostList(response.data);
            }catch(e){
                console.dir(e);
            }
            setLoading(false);
        };
        fetchPost();
    }, []);

    if(loading) return <h2>로딩중...</h2>;
    if(!postList) return null;

    return(
        <UserPostShowWrapper>
            <UserPostShowForm postList={postList}/>
        </UserPostShowWrapper>
    )
};

export default UserPostShowContainer;
