import client from "./client";

export const list = () => client.get('/api/map');

export const post = () => client.post('/api/map/');

export const fetchPlaceInfo = (id) => client.get(`/api/map/userPlace/${id}`);

export const fetchRoadInfo = (id) => client.get(`/api/map/userRoad/${id}`);

export const fetchBuildingInfo = id => client.get(`/api/map/userBuilding/${id}`);
