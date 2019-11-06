import UserPlace from "../../models/userPlace"
import Post from "../../models/post";

const post = new Post([
    {
        title: "title1",
        body: "body1",
        tags: ["tags1", "tags2", "tags3"],
        publishingDate: { type : Date, default: Date.now },
        user: {
            username: "user1",
        }
    },
    {
        title: "title2",
        body: "body2",
        tags: ["tags4", "tags5", "tags6"],
        publishingDate: { type : Date, default: Date.now },
        user: {
            username: "user2",
        },
    },
]);

const userPlaceList = new UserPlace([
    {
        name: "첫번쨰 이름",
        description: "첫번째 설명",
        tags: ["태그1", "태그2"],
        position: {lat: 30, lng: 123},
        posts: post,
    },
]);

exports.makeUserPlace = async ctx => {
    const { name, description, tags, position, detailedAddress } = ctx.request.body;
    const userPlace = new UserPlace({
        name, description, tags, position, detailedAddress,
    });
    try{
        await userPlace.save();
        ctx.body = userPlace;
    } catch(e) {
        ctx.throw(500, e);
    }
};

exports.listUserPlace = async ctx => {
    try{
        const userplace = await UserPlace.find().exec();
        if(!userplace) {
            ctx.status = 404;
            return;
        }
       ctx.body = userplace;
    } catch(e){
        ctx.throw(500, e);
    }
};

exports.findUserPlace = async ctx => {
    const { id } = ctx.params;
    try{
        const userplace = await UserPlace.findById(id).exec();
        if(!userplace){
            ctx.status = 404;
            return;
        }
        ctx.body = userplace;
    } catch(e){
        ctx.throw(500, e);
    }
};
