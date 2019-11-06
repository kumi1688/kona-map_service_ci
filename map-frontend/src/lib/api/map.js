import client from "./client";

export const list = () => client.get('/api/map');

export const post = () => client.post('/api/map/');
