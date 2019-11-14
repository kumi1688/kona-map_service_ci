import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import map from './map';
import upload from './upload';
import comment from "./comment";

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/map', map.routes());
api.use('/upload', upload.routes());
api.use('/comment', comment.routes());

export default api;
