import client from "./client";


export const login = ( {username, password}) =>
    client.post('/api/auth/login', {username, password});

export const register = ({username, password, firstLivingArea, secondLivingArea, gender, age, providingInfo}) =>
    client.post('/api/auth/register', {username, password, firstLivingArea, secondLivingArea,
        gender, age, providingInfo});

export const fetchUserData = (username) => client.get(`/api/auth/userInfo/${username}`);

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const addWarning = (username) => client.patch(`/api/auth/addWarning/${username}`);

