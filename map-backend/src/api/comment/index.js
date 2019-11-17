import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl'

const comment = new Router();

comment.post('/:objectId', commentCtrl.register);
comment.get('/:username', commentCtrl.findByUsername);

export default comment;
