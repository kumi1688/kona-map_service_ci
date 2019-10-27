import React, {useState} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import HeaderContainer from "../containers/common/headerContainer";
import MapContainer from "../containers/map/MapContainer";
import MapEditor from "../components/map/MapEditor";
import MapTagBox from "../components/map/MapTagBox";
import MapActionButtons from "../components/map/MapActionButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export const Example = () => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <>
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                </Alert>
                <Button variant="outline-primary">hello</Button>
            </>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};

const MapPage = () => {
    return (
        <>
            <HeaderContainer/>
            <MapContainer/>
        </>
    );

};

export default MapPage;
