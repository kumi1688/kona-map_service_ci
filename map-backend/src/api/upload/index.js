import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';

const upload = new Router();

upload.post('/', uploadCtrl.upload2);

export default upload;
