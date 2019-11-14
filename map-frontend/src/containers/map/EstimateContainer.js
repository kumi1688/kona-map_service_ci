import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {number} from "prop-types";

const CustomFormCheck = ({label, number}) => {
    return (
        <Form.Check
            custom
            inline
            label={number}
            type="checkbox"
            id={`custom-inline-checkbox-${label}-${number}`}
        />
    );
};

const CustomForm = ({label}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            {[1, 2, 3, 4, 5].map(number => (<CustomFormCheck label={label} number={number}/>))}
        </Form.Group>
    )
};

const EstimateContainer = () => {
    return (
        <>
            <CustomForm label="신뢰도"/>
            <CustomForm label="유용도"/>
            <CustomForm label="신선도"/>
            <CustomForm label="적절함"/>
        </>
    );
};

export default EstimateContainer;
