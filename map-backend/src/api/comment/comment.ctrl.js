import Comment from "../../models/comment";
import UserPlace from "../../models/userPlace";
import User from '../../models/user';
import Joi from "joi";
import sanitizeHtml from "sanitize-html";
import comment from "./index";

function makeCommentList(array) {
    let newCommentList = [];
    for (const item of array) {
        const comment = makeComment(item);
        //console.dir(comment._doc);
        //console.log('\n\n\n\n');

        newCommentList = newCommentList.concat(comment._doc);

        //console.log('---------------------------------');
        //console.dir(comment);
        //console.log('---------------------------------');
    }
    console.log('Done!');
    //console.dir(newCommentList[1]);
    return newCommentList;
}

function makeComment(item){
    return new Comment({
        title: item.title,
        body: item.body,
        username: item.username
    });
};

export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        title: Joi.string(),
        body: Joi.string(),
    });

    ctx.request.body.forEach(function(element){
        const result = Joi.validate(ctx.request.body, schema);
        if (result.error) {
            ctx.status = 400;
            ctx.body = result.error;
            return;
        }
    });

    try {
        let {objectId} = ctx.params;

        const result = await UserPlace.findByObjectID(objectId);
        //console.dir(result);
        let commentList = result[0]._doc.commentList;

        if (!result) {
            ctx.status = 409;
            return;
        }

        let newCommentList = makeCommentList(ctx.request.body);
        //console.log('ㄴㅁㅇㄹㄴㅁㄹㄴㅁㅇㄹㄴㅁㄹ'); console.dir(newCommentList);
        //console.dir(newCommentList);

        //console.dir(newCommentList);


        /*
        ctx.request.body.forEach(async function(element){
            let { title, body, username } = element;
            const comment = new Comment({
                title, body, username
            });
            comment.save();
            if (!commentList) commentList = comment;
            else commentList = commentList.concat(comment);
        });
         */
        //console.dir(newCommentList);
        const nextData = {...result, commentList: newCommentList};
        //console.dir(nextData.commentList);

        console.dir(nextData.commentList);
        const result2 = UserPlace.findByIdAndUpdate(objectId, nextData, {
            new: true
        }).exec();
        if (!result2) {
            ctx.body = 404;
            return;
        }
        ctx.body = result2;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const findByUsername = async ctx => {
    const {username} = ctx.params;
    //console.dir(ctx.params);
    try {
        const comment = await Comment.findByUsername(username).exec();
        if (!comment) {
            ctx.status = 404;
            return;
        }
        ctx.body = comment;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const findByObjectID = async ctx => {
    const {objectId} = ctx.params;
    console.dir(objectId);
    try {
        const userPlace = await Comment.findByObjectID(objectId).exec();
        if (!userPlace) {
            ctx.status = 404;
            return;
        }
        ctx.body = userPlace;
        //console.dir(userPlace[0]._doc.commentList);
    } catch (e) {
        ctx.throw(500, e);
    }
};
