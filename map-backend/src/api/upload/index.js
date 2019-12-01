import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';

const upload = new Router();

upload.post('/', uploadCtrl.upload3);

export default upload;
