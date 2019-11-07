import React, {useEffect, useState} from "react";
import {Marker, InfoWindow} from "@react-google-maps/api";

const InfoWindowList = ({info}) => {
    useEffect(() => {
        console.dir(info);
    });

    return (
        <>
            {info.map((inf, index) => (<InfoWindowItem position={inf.position} key={inf._id} info={inf}/>))}
        </>
    );
};


const InfoWindowItem = ({position, info}) => {
    const [visible, setVisible] = useState(null);
    useEffect( () =>{
        console.dir(info);
    });

    const onClick = () =>{
        if(!visible) setVisible(true);
        else setVisible(false);
    }

    return (
        <>
            <Marker position={position} onClick={onClick}/>
            {visible && <InfoWindow position={position}>
                <div>
                    <p>이름 : {info.name}</p>
                    <p>설명 : {info.description}</p>
                    <p>자세한 설명 : {info.detailedPosition}</p>
                    <p>태그 : {info.tags.map((tag, index) => (<li key={index}>{tag}</li>))}</p>
                </div>
            </InfoWindow>
            }
        </>
    );
};

export default InfoWindowList;
