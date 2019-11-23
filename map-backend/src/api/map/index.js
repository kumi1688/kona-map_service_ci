import Router from 'koa-router';
import * as mapCtrl from './map.ctrl';

const map = new Router();

map.get('/username/:username', mapCtrl.findUserPlaceByUserName);
map.get('/:id', mapCtrl.findUserPlace);
map.get('/', mapCtrl.listUserPlace);
map.get('/find/:primary', mapCtrl.findUserPlaceByType);
map.post('/', mapCtrl.makeUserPlace);
map.post('/userRoad', mapCtrl.makeUserRoad);
map.get('/userRoad', mapCtrl.listUserRoads);
map.get('/userRoad/username/:username', mapCtrl.findUserRoadByUserName)

export default map;
