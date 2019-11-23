import Board from '@lourenci/react-kanban'
import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding-left: 60px;
`;

const boardComponent = {
    lanes: [
        {
            id: 1,
            title: 'Backlog',
            cards: [
                {
                    id: 1,
                    title: 'Add card',
                    description: 'Add capability to add a card in a lane'
                },
            ]
        },
        {
            id: 2,
            title: 'Doing',
            cards: [
                {
                    id: 2,
                    title: 'Drag-n-drop support',
                    description: 'Move a card between the lanes'
                },
            ]
        }
    ]
};

const BoardComponent = () => {
    return (
        <StyledWrapper>
            <Board>{boardComponent}</Board>
        </StyledWrapper>
    )
};

export default BoardComponent;
