import React, {useState, useCallback} from 'react';
import {Rectangle} from "@react-google-maps/api";

const RectangleContainer = ({leftUpper, rightDown }) => {
    const [localPosition, setLocalPosition] = useState(null);
    const [localLeftUpper, setLocalLeftUpper] = useState(leftUpper);
    const [localRightDown, setLocalRightDown] = useState(rightDown);

    const onDrag = useCallback((e) => {
        console.dir(e);
    }, );

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
                       onClick={e => console.dir(e)}
                       />
        </>
    );
};

export default RectangleContainer;
