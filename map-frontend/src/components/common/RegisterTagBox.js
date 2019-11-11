import React, {useState, useCallback, useEffect} from 'react';
import {Row, Col, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TagItem = React.memo(({tag, onRemove}) => (
    <Alert variant="danger" onClick={() => onRemove(tag)} dismissible>#{tag}</Alert>
));

const TagList = React.memo(({tags, onRemove}) => (
    <Row>
        {tags.map(tag => (<TagItem key={tag} tag={tag} onRemove={onRemove}/>))}
    </Row>
));

const RegisterTagBox = ({updateTags, form} ) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        tag => {
            console.dir(tag);
            let str_tag = tag.toString();
            if (!str_tag) return;
            if (localTags.includes(str_tag)) return;
            setLocalTags([...localTags, str_tag]);
            form.wanted = [...localTags, str_tag];
            console.dir(form);
        }, [localTags],
    );

    const onRemove = useCallback(
        tag => {
            setLocalTags(localTags.filter(t => t !== tag));
        }, [localTags],
    );

    const onChange = useCallback(e => {
        setInput(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            insertTag(input.trim());
            //updateTags(localTags);
            setInput('');
        }, [input, insertTag]
    );

    const onKeyPress = useCallback(
        e => {
            if (e.key === 'Enter') {
                onSubmit(e);
            }
        }, [input, insertTag]
    );

    return (
        <>
            <Row >
                <Col xs={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>원하는 것</InputGroup.Prepend>
                        <FormControl placeholder="원하는 것을 입력해주세요" value={input} onChange={onChange}
                                     onKeyPress={onKeyPress} />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={onSubmit}>추가</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <TagList tags={localTags} onRemove={onRemove}/>
                </Col>
            </Row>
        </>
    );
};

export default RegisterTagBox;
