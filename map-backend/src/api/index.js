import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import map from './map';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/map', map.routes());

export default api;
