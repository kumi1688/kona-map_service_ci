import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl'

const comment = new Router();

comment.post('/:objectId', commentCtrl.register);

comment.get('/findComment/:username', commentCtrl.findByUsername);

comment.get('/userList', commentCtrl.fetchCommentList);

export default comment;
