import Router from 'koa-router';
import * as mapCtrl from './map.ctrl';
import checkLoggedIn from "../../lib/checkLoggedIn";

const map = new Router();

map.get('/username/:username', mapCtrl.findUserPlaceByUserName);
map.get('/userPlace/:id', mapCtrl.findUserPlace);
map.get('/userPlace', mapCtrl.listUserPlace);
map.get('/find/:primary', mapCtrl.findUserPlaceByType);
map.post('/', mapCtrl.makeUserPlace);
map.post('/userRoad', mapCtrl.makeUserRoad);
map.patch('/userRoad/comment/:id', checkLoggedIn, mapCtrl.updateUserRoadComment);
map.patch('/userPlace/comment/:id', checkLoggedIn, mapCtrl.updateUserPlaceComment);
map.post('/userBundle', checkLoggedIn, mapCtrl.makeUserBundle);
map.get('/userBundle', mapCtrl.listUserBundle);

map.get('/userRoad', mapCtrl.listUserRoads);
map.get('/userRoad/username/:username', mapCtrl.findUserRoadByUserName)

export default map;
