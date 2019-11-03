import Router from 'koa-router';
import * as commentCtrl from './auth.ctrl';

const comment = new Router();

comment.post('/register', commentCtrl.register);
comment.get('/check', commentCtrl.check);
comment.patch('/update', commentCtrl.update);
comment.delete('/remove', commentCtrl.remove);

export default comment;
