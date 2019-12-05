import Router from 'koa-router';
import auth from './auth';
import map from './map';
import upload from './upload';
import comment from "./comment";
import admin from './admin';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/map', map.routes());
api.use('/upload', upload.routes());
api.use('/comment', comment.routes());
api.use('/admin', admin.routes());

export default api;
