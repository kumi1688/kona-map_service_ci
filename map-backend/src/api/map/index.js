import Router from 'koa-router';
import * as mapCtrl from './map.ctrl';
//const mapCtrl = require('./map.ctrl');

const map = new Router();

map.get('/:id', mapCtrl.findUserPlace)
map.get('/', mapCtrl.listUserPlace);
map.post('/', mapCtrl.makeUserPlace);

export default map;
