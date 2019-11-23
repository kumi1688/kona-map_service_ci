import React, {useCallback, useState} from 'react'
import HeaderContainer from "../containers/common/HeaderContainer";
import MapContainer from "../containers/map/MapContainer";
import SideBarContainter from "../containers/map/SideBarContainer";
import styled from "styled-components";

const StyledMapPage = styled.div`
    
    padding-left : 60px;
`;

const MapPage = () => {
    return (
        <>
            <StyledMapPage>
                <MapContainer />
            </StyledMapPage>
        </>
    );
};

export default MapPage;
