import React from "react";
import { geolocated } from "react-geolocated";

class Geolocated extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.dir(this.props);
        console.dir(prevProps);
        console.dir(prevState);
        if(this.props.coords) {
            console.log('저장됨');
            this.props.setCurLocation({lat: this.props.coords.latitude, lng: this.props.coords.longitude});
        }
    }

    render() {
        return (
            !this.props.isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
            ) : !this.props.isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
            ) : this.props.coords ? <div/> : null
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocated);
