import React from 'react';
import HeaderContainer from "../containers/common/headerContainer";
import PostList from "../components/posts/PostList";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer";

const PostListPage = () => {
    return (
        <>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </>
    );
};

export default PostListPage;
