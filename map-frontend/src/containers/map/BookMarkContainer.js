import React from "react";
import styled from "styled-components";

const StyledBookMarkWrapper = styled.div`
    z-index : 10;
    position: fixed;
    background-color : white;
    left: 0;
    margin : 20px 20px 40px 20px;
    padding-left: 80px;
    padding-right: 20px;
    padding-top: 30px;
    padding-bottom: 20px;
`;

const BookMarkContainer = () => {
    return (
        <StyledBookMarkWrapper>
            <h2>hello</h2>
        </StyledBookMarkWrapper>
    );
};

export default BookMarkContainer;
