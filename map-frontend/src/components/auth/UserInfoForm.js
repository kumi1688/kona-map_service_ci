import React from 'react';
import styled from "styled-components";
import palette from "../../lib/styles/palette";

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

const UserInfoForm = ({form, onChange}) => {
    return(
        <>
            <StyledInput name="livingArea" placeholder="사는 지역" value={form.livingArea} onChange={onChange}/>
            <StyledInput name="gender" placeholder="성별" value={form.gender} onChange={onChange}/>
            <StyledInput name="age" placeholder="나이" value={form.age} onChange={onChange}/>
            <StyledInput name="job" placeholder="직업" value={form.job} onChange={onChange}/>
            <StyledInput name="wanted" placeholder="이 앱으로 원하는 것" value={form.wanted} onChange={onChange}/>

        </>
    )
};

export default UserInfoForm;
