import Router from 'koa-router';
import * as mapCtrl from './map.ctrl';

const map = new Router();

map.get('/:id', mapCtrl.findUserPlace);
map.get('/', mapCtrl.listUserPlace);
map.get('/find/:primary', mapCtrl.findUserPlaceByType);
map.post('/', mapCtrl.makeUserPlace);

export default map;
