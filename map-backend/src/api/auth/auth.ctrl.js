import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
        livingArea: Joi.string(),
        gender: Joi.string(),
        age: Joi.string(),
        job: Joi.string(),
        //tags: Joi.array().items(Joi.string()).required(),
        wanted: Joi.array().items(Joi.string()),
        providingInfo: Joi.bool(),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password, livingArea, gender, age, job, wanted, providingInfo } = ctx.request.body;
    try{
        const exists = await User.findByUsername(username);
        if( exists ) {
            ctx.status = 409;
            return;
        }

        const user = new User({
            username, livingArea, gender, age, job, wanted, providingInfo
        });
        await user.setPassword(password);
        await user.save();

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000* 60*60*24*7,
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    const { username, password } = ctx.request.body;

    if(!username || !password ) {
        ctx.status = 401;
        return;
    }

    try{
        const user = await User.findByUsername(username);
        if(!user){
            ctx.staus = 401;
            return;
        }

        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            return;
        }

        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        });
    } catch(e){
        ctx.throw(500, e);
    }
};
export const check = async ctx => {
    const { user } = ctx.state;
    if(!user){
        ctx.status = 401;
        return;
    }
    ctx.body = user;
};
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204;
};

export const userInfo = async ctx => {
    const { username } = ctx.params;
    console.dir(ctx.params);

    try{
        const userInfo = await User.findByUsername(username).exec();
        if(!userInfo){
            ctx.status = 404;
            return;
        }
        ctx.body = userInfo;
    } catch(e){
        ctx.throw(500, e);
    }
};
