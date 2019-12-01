import client from "./client";

export const login = ( {username, password} ) =>
    client.post('/api/auth/login', {username, password});

export const fetchUserData = ({username}) => client.get(`/api/auth/userInfo/${username}`);

export const fetchUserDataList = () => client.get('/api/auth/userInfoList');

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const getUserNumber = () => client.get('/api/auth/userNumber');

export const getUserStatistics = () => client.get('/api/auth/userStatistics');

export const setWatch = ({username, status}) => client.patch(`/api/auth/setWatch/${username}`, {username, status});

export const setBlock = ({username, status}) => client.patch(`/api/auth/setBlock/${username}`, {username, status});
