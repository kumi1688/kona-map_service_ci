import React, {useCallback, useEffect, useState} from "react";
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import client from "../../lib/api/client";
import {useSelector} from "react-redux";
import CommentEditor from "./CommentEditor";

const CommentList = ({info}) => {
    return (
        <>
            {info.map((inf) => (<li key={inf._id}>{inf.title}</li>))};
        </>
    )
};

const CommentContainer = () => {
    const [localcomment, setLocalComment] = useState([]);
    const {username} = useSelector(({user}) => ({
        username: user.user.username,
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get(`/api/comment/${username}`);
                setLocalComment(response.data);
            } catch (e) {
                console.dir(e);
            }
        };
        fetchData();
    }, []);



    if (!localcomment) return null;

    return (
        <>
            <CommentList info={localcomment}/>
            <CommentEditor />

        </>
    );
};

export default CommentContainer;
