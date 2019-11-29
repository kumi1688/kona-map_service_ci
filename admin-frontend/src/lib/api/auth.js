import client from "./client";

export const login = ( {username, password} ) =>
    client.post('/api/auth/login', {username, password});

export const fetchUserData = ({username}) => client.get(`/api/auth/userInfo/${username}`);

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const getUserNumber = () => client.get('/api/auth/userNumber');
