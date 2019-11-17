import Comment from "../../models/comment";
import UserPlace from "../../models/userPlace";
import User from '../../models/user';
import Joi from "joi";
import sanitizeHtml from "sanitize-html";

export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        title: Joi.string(),
        body: Joi.string(),
        objectID: Joi.string(),
    });

    //console.dir(ctx.request.body);
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, username, objectID} = ctx.request.body;
    //console.dir(ctx.request.body);

    try {
        const result = await UserPlace.findByObjectID(objectID);
        //console.dir(result);
        let commentList = result[0]._doc.commentList;

        if (!result) {
            ctx.status = 409;
            return;
        }
        const comment = new Comment({
            title, body, username
        });
        await comment.save();

        if (!commentList) commentList = comment;
        else commentList = commentList.concat(comment);

        const nextData = {...result, commentList: commentList};


        const result2 = UserPlace.findByIdAndUpdate(objectID, nextData, {
            new: true
        }).exec();
        if (!result2) {
            ctx.body = 404;
            return;
        }
        ctx.body = result;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const findByUsername = async ctx => {
    const {username} = ctx.params;
    console.dir(ctx.params);
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
    } catch (e) {
        ctx.throw(500, e);
    }
};
