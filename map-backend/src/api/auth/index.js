import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.get('/userInfo/:username', authCtrl.userInfo);
auth.get('/userNumber', authCtrl.getTotalUserNumber);
auth.get('/manNumber', authCtrl.getManNumber);
auth.get('/userStatistics', authCtrl.getUserStatistics);

export default auth;
