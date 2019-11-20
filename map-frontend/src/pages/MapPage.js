import React, {useCallback, useState} from 'react'
import HeaderContainer from "../containers/common/HeaderContainer";
import MapContainer from "../containers/map/MapContainer";
import SideBarContainter from "../containers/map/SideBarContainer";
import styled from "styled-components";

const StyledMapPage = styled.div`
    padding-top: 60px;
    padding-left : 60px;
`;

const MapPage = () => {
    const [popUp, setPopUp] = useState(null);

    const onPopUpClick = useCallback(
        e => {
            if (!popUp) setPopUp(true);
            else setPopUp(false);
        }, [popUp]);

    return (
        <>
            <StyledMapPage>
                <MapContainer onPopUpClick={onPopUpClick}/>
            </StyledMapPage>
        </>
    );
};

export default MapPage;
