import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import {changeField, fetchUserData, initializeForm, login, resetUserData} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check, logout} from '../../modules/user';
import client from "../../lib/api/client";


const LoginForm = ({history}) => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const {form, auth, authError, user, userInfo} = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
        userInfo: auth.userInfo
    }));
    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password} = form;
        dispatch(login({username, password}));
    };

    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserData(user.username));
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('로컬 storage 작동하지 않음');
            }
        }
    }, [history, user]);

    useEffect(() => {
        if (userInfo && user) {
            if (userInfo.status.block) {
                alert('관리자에 의해 차단되었습니다');
                dispatch(resetUserData());
                dispatch(logout());
                history.push('/login');
                return;
            } else if (userInfo.status.watch) {
                console.dir(user);
                alert('현재 신고된 사항이 있습니다. 게시글을 확인해주세요');
            }
            history.push('/home');
        }
    }, [userInfo, user]);

    useEffect(() => {
        if (authError) {
            console.log('에러 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            dispatch(check());

        }
    }, [auth, authError, dispatch]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
