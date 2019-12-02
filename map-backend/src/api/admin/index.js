import Router from 'koa-router';
import * as adminCtrl from './admin.ctrl';

const admin = new Router();

admin.get('/userPlaceStatistics', adminCtrl.getUserPlaceStatistics);
admin.get('/userRoadStatistics', adminCtrl.getUserRoadStatistics);
admin.get('/userPlaceList', adminCtrl.getUserPlaceList);
admin.get('/userRoadList', adminCtrl.getUserRoadList);

export default admin;
