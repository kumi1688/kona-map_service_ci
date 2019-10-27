import React, {useRef, useEffect} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";

const EditorBlock = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const WrapperBlock = styled.div`
    font-size: 3rem;
    
    &:hover{
        background: ${palette.cyan[5]};
        opacity : 0.7;    
    }
`;

const MapEditor = () => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '이름을 입력해주세요',
        })
    }, []);

    return (
        <EditorBlock>
            <WrapperBlock>
                <h4 ref={quillElement}/>
            </WrapperBlock>
        </EditorBlock>
    );
};

export default MapEditor;
