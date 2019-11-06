import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap"

const PopOverButton = ({titleMessage, contentMessage, ButtonLabel, onClick}) => {
    const Message = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">{titleMessage}</Popover.Title>
            <Popover.Content>
                {contentMessage}
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={Message}>
            <Button variant="outline-info" onClick={onClick}>{ButtonLabel}</Button>
        </OverlayTrigger>
    );
};

export default PopOverButton;
