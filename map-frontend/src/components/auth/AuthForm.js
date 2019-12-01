import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import {FormGroup, Form, FormLabel} from 'react-bootstrap';
import UserInfoInsertForm from "./UserInfoInsertForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "../../modules/auth";

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
            if (!agree) setAgree(true);
            else setAgree(false);
        }, [agree]
    );

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <Form inline>
                    <Form.Label style={{paddingRight: 65, textAlign: "center"}}>아이디</Form.Label>
                    <Form.Control as="input" autoComplete="username" name="username" placeholder="아이디"
                                  onChange={onChange} value={form.username} style={{width: '70%'}}/>
                </Form>
                <div style={{paddingTop: 10}}/>
                <Form inline>
                    <Form.Label style={{paddingRight: 50}}>비밀번호</Form.Label>
                    <Form.Control as="input"
                                  autoComplete="new-password" name="password" placeholder="비밀번호"
                                  type="password" onChange={onChange} value={form.password}
                                  style={{width: '70%'}}/>
                </Form>
                <div style={{paddingTop: 10}}/>
                {type === 'register' && (
                    <Form inline>
                        <Form.Label style={{paddingRight: 20}}>비밀번호확인</Form.Label>
                        <Form.Control as="input"
                                      autoComplete="new-password" name="passwordConfirm" placeholder="비밀번호 확인"
                                      type="password" onChange={onChange} value={form.passwordConfirm}
                                    style={{width: '70%'}}/>
                    </Form>
                )}
                {(type === 'register' && !agree) && (
                    <FormGroup style={{paddingTop: 10}}>
                        <Form.Check
                            name="providingInfoConfirm"
                            label="정보제공동의"
                            onClick={onClick}
                        />
                    </FormGroup>
                )}
                {agree && <UserInfoInsertForm form={form} onChange={onChange}/>}
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
