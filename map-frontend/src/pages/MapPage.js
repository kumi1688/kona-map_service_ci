import React, {useCallback, useState} from 'react'
import HeaderContainer from "../containers/common/HeaderContainer";
import MapContainer from "../containers/map/MapContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

const MapPage = () => {
    const [popUp, setPopUp] = useState(null);

    const onPopUpClick = useCallback(
        e => {
            if(!popUp) setPopUp(true);
            else setPopUp(false);
        }, [popUp]);

    return (
        <>
            <HeaderContainer/>
            {popUp && <h2>hello!!</h2>}
            <>
            <MapContainer onPopUpClick={onPopUpClick}/>
            </>
        </>
    );
};

export default MapPage;
