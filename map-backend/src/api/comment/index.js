import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl'

const comment = new Router();

// 댓글 등록하기
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/comment/:objectId
comment.post('/:objectId', commentCtrl.register);

// 사용자별로 댓글 가져오기
// :username 은 username 이라는 parameter를 넘긴다는 뜻 parameter가 있다면 해당 username을 가진 유저가
// 작성한 댓글을 모두 가져옴
// parameter가 없다면 모든 댓글을 가져옴
// http://ec2-54-180-114-63.ap-northeast-2.compute.amazonaws.com:4000/api/comment/:username
comment.get('/:username', commentCtrl.findByUsername);

export default comment;
