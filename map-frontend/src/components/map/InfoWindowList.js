import React, {useEffect, useState} from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";

const InfoWindowList = ({info}) => {
    useEffect(() => {
        console.dir(info);
    });

    return (
        <>
            {info.map((inf) => (<InfoWindowItem position={inf.position} key={inf._id} info={inf}/>))}
        </>
    );
};

const InfoWindowItem = ({position, info}) => {
    const [visible, setVisible] = useState(null);
    useEffect(() => {
        console.dir(info);
    });

    const onClick = () => {
        if (!visible) setVisible(true);
        else setVisible(false);
    }

    return (
        <>
            <Marker position={position} onClick={onClick}/>
            {visible && <InfoWindow position={position}>
                <>
                    <h3>이름 : {info.name}</h3>
                    <h3>설명 : {info.description}</h3>
                    <h3>자세한 설명 : {info.detailedPosition}</h3>
                    <h3>위치 타입 : {info.primaryPositionType}, {info.secondaryPositionType}</h3>
                    <h3>태그 : {info.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</h3>
                    <p>등록일 : {info.publishingDate}</p>
                </>
            </InfoWindow>
            }
        </>
    );
};

export default InfoWindowList;
