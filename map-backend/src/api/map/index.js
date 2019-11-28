import Router from 'koa-router';
import * as mapCtrl from './map.ctrl';
import checkLoggedIn from "../../lib/checkLoggedIn";

const map = new Router();

// 사용자가 등록한 위치를 조회하기
// :username 의 경우 : 뒤에 있는건 parameter. 즉 username이라는 parameter를 전달받음
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/username/:username
map.get('/username/:username', mapCtrl.findUserPlaceByUserName);

// 사용자가 등록한 위치를 ID를 이용해 조회하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userPlace/:id
map.get('/userPlace/:id', mapCtrl.findUserPlace);

// 사용자가 등록한 위치를 모두 조회하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userPlace/
map.get('/userPlace', mapCtrl.listUserPlace);

// 사용자가 등록한 위치를 대분류에 따라서 찾기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/find/:primary
map.get('/find/:primary', mapCtrl.findUserPlaceByType);

// 사용자가 위치 정보를 등록하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/
map.post('/', mapCtrl.makeUserPlace);

// 사용자가 경로 정보를 등록하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userRoad
map.post('/userRoad', mapCtrl.makeUserRoad);

// 사용자가 등록한 경로에 댓글 달기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userRoad/comment/:id
map.patch('/userRoad/comment/:id', checkLoggedIn, mapCtrl.updateUserRoadComment);

// 사용자가 등록한 위치에 댓글 달기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userPlace/comment/:id
map.patch('/userPlace/comment/:id', checkLoggedIn, mapCtrl.updateUserPlaceComment);

// 위치, 경로를 포함하는 모음집 만들기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userBundle/
map.post('/userBundle', checkLoggedIn, mapCtrl.makeUserBundle);

// 모음집 모두 조회하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userBundle
map.get('/userBundle', mapCtrl.listUserBundle);

// 사용자의 경로를 모두 조회하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userRoad
map.get('/userRoad', mapCtrl.listUserRoads);

// 사용자가 추가한 경로를 아이디 별로 조회하기
/*
http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/map/userRoad/username/:username
 */
map.get('/userRoad/username/:username', mapCtrl.findUserRoadByUserName);

export default map;
