import React, {useEffect} from 'react';
import {Rectangle} from "@react-google-maps/api";

const RectangleContainer = ({leftUpper, rightDown }) => {

    const onDrag = () => {
        console.log(`i'm on dragging`);
    };

    return (
        <>
            <Rectangle bounds={{
                // 37.284315, lng: 127.044504
                north: parseFloat(leftUpper.lat),
                west: parseFloat(leftUpper.lng),
                south: parseFloat(rightDown.lat),
                east: parseFloat(rightDown.lng),
            }} editable={true}
                       draggable={true}
                       onDrag={onDrag}
                       />
        </>
    );
};

export default RectangleContainer;
