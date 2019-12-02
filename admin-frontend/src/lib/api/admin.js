import client from "./client";

export const fetchUserPlaceStatistics = () => client.get('/api/admin/userPlaceStatistics');
export const fetchUserRoadStatistics = () => client.get('/api/admin/userRoadStatistics');
export const fetchUserPlaceList = () => client.get('/api/admin/userPlaceList');
export const fetchUserRoadList = () => client.get('/api/admin/userRoadList');
