import Comment from "../../models/comment";
import User from '../../models/user';
import Joi from "joi";

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

    console.dir(ctx.request.body);
    const result = Joi.validate(ctx.request.body, schema);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, username} = ctx.request.body;
    console.dir(ctx.request.body);

    try {
        const result = await User.findByUsername(username);
        console.dir(result);
        if (!result) {
            ctx.status = 409;
            return;
        }
    } catch (e) {
        ctx.throw(500, e);
    }

    try{
        const comment = new Comment({
            title, body, username
        });
        await comment.save();
        ctx.body = comment;
    }catch(e){
        ctx.throw(500, e);
    }
};

export const findByUsername = async ctx => {
    const {username} = ctx.params;
    console.dir(ctx.params);
    try{
        const comment = await Comment.findByUsername(username).exec();
        if(!comment){
            ctx.status = 404;
            return;
        }
        ctx.body = comment;
    } catch(e){
        ctx.throw(500, e);
    }
};
