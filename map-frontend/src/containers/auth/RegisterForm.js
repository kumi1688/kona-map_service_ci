import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));


    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm, livingArea, gender, age,
            job, wanted,  } = form;
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if( password !== passwordConfirm ){
            setError('비밀번호가 일치하지 않습니다');
            changeField({form: 'register', key: 'password', value: ''});
            changeField({form: 'register', key: 'passwordConfirm', value: ''});
            return;
        }
        if( password !== passwordConfirm) {return;}
        dispatch(register({username, password, livingArea, gender, age, job, wanted, }));
    };


    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    //회원가입 성공/실패 처리
    useEffect(() => {
        if(authError) {

            console.log('오류 발생');
            console.log(authError);
            if(authError.response.status === 409 ){
                setError('이미 존재하는 계정입니다.');
                return;
            }

            setError('회원가입 실패');
            return;
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(()=> {
        if (user) {
            console.log('check API 성공');
            console.log(user);
            history.push('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('로컬 storage 작동하지 않음');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);
