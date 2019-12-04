const mainRoad = {
    strokeColor: '#0091ff',
    strokeOpacity: 0.8,
    strokeWeight: 10,
    fillColor: '#0091ff',
    fillOpacity: 0.35,
    clickable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
    geodesic: true
};

const travelRoad = {
    strokeColor: '#ffea1c',
    strokeOpacity: 0.8,
    strokeWeight: 10,
    fillColor: '#ffea1c',
    fillOpacity: 0.35,
    clickable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
    geodesic: true
};

const smallRoad = {
    strokeColor: '#60fff3',
    strokeOpacity: 0.8,
    strokeWeight: 10,
    fillColor: '#60fff3',
    fillOpacity: 0.35,
    clickable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
    geodesic: true
};

const foodRoad = {
    strokeColor: '#9aff50',
    strokeOpacity: 0.8,
    strokeWeight: 10,
    fillColor: '#9aff50',
    fillOpacity: 0.35,
    clickable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
    geodesic: true
};

const sightSeeingRoad = {
    strokeColor: '#ff59c8',
    strokeOpacity: 0.8,
    strokeWeight: 10,
    fillColor: '#ff59c8',
    fillOpacity: 0.35,
    clickable: true,
    visible: true,
    radius: 30000,
    zIndex: 1,
    geodesic: true
};

const rectangleOption = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    draggable: true,
    editable: true
};

const circleOption = {
    fillColor: '#ffff00',
    fillOpacity: 1,
    strokeWeight: 5,
    clickable: false,
    editable: true,
    zIndex: 1
};

export const polylineOptions = {mainRoad, smallRoad, travelRoad, foodRoad, sightSeeingRoad};
export const rectangleOptions = {rectangleOption};
export const circleOptions = {circleOption}
