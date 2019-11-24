import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import {FormGroup, Form} from 'react-bootstrap';
import UserInfoInsertForm from "./UserInfoInsertForm";

//회원가입 or 로그인


const ButtonWithMarginTop = styled(Button)`
margin-top: 1rem;
`;

const AuthFormBlock = styled.div`
    h3 {
    margin: 0;
    color: ${palette.blue[3]};
    margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
    margin-top : 2rem;
    text-align: right;
    
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size : 0.875rem;
    margin-top: 1rem;
`;


const textMap = {
    login: '로그인',
    register: '회원가입',
};


const AuthForm = ({type, form, onChange, onSubmit, error}) => {
    const [agree, setAgree] = useState(false);
    const text = textMap[type];

    const onClick = useCallback(
        () => {
            if(!agree) setAgree(true);
            else setAgree(false);
        }, [agree]
    );

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput autoComplete="username" name="username" placeholder="아이디"
                             onChange={onChange} value={form.username}/>
                <StyledInput
                    autoComplete="new-password" name="password" placeholder="비밀번호"
                    type="password" onChange={onChange} value={form.password}/>
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password" name="passwordConfirm" placeholder="비밀번호 확인"
                        type="password" onChange={onChange} value={form.passwordConfirm}/>
                )}
                {(type === 'register' && !agree) && (
                    <FormGroup>
                        <Form.Check
                            name="providingInfoConfirm"
                            label="정보제공동의"
                            onClick={onClick}
                        />
                    </FormGroup>
                )}
                {agree && <UserInfoInsertForm form={form} onChange={onChange} />}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonWithMarginTop fullWidth>{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {type === 'login' ?
                    (<Link to="/register">회원가입</Link>) :
                    (<Link to="/login">로그인</Link>)
                }
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;
