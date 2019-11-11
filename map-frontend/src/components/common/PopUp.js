import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import styled from "styled-components";

const HeaderBlock = styled.div`
      position: fixed;
      z-index : 30;
      width: 100%;
      background: white;
      box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    `;

const PopUp = () => {
    const handleClick = (e, data) =>{
      console.dir(data.foo);
    };
    return (
        <HeaderBlock>
            <ContextMenuTrigger id="some_unique_identifier">
                <div className="well">Right click to see the menu</div>
            </ContextMenuTrigger>
            <ContextMenu id="some_unique_identifier">
                <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
                    ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
                    ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
                    ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
        </HeaderBlock>
    );
};

export default PopUp;
