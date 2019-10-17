import axios from 'axios';

export const login = ( {username, password}) =>
    auth.post('/api/auth/login', {username, password});

export const register = ({username, password}) =>
    auth.post('/api/auth/register', {username, password});

export const check = () => auth.get('/api/auth/check');

export const logout = () => auth.post('/api/auth/logout');

const auth = axios.create();

