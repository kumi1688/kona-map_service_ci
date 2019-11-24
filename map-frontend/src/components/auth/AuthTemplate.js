import React from 'react';
import styled from 'styled-components';
import palette from "../../lib/styles/palette";
import {Link} from 'react-router-dom';

// 회원가입/로그인 레이아웃

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    background: ${palette.gray[5]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;
//justify-content == 컨텐츠들을 가운데 정렬 ( 가로축 )
//align-items == 컨텐츠드을 가운데 정렬 ( 세로축 )

const WhiteBox = styled.div`
    .logo-area{
    display: block;
    padding_bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing : 2pxx;
       }
       background: white;
        padding: 2rem;
        width: 500px;
`;


const AuthTemplate = ({children}) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">메인 화면으로</Link>
                </div>
                {children}
            </WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;
