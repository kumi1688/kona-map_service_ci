import UserPlace from "../../models/userPlace"
import Post from "../../models/post";
import User from "../../models/user";
import UserRoad from "../../models/userRoad";

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
    const { username, name, description, tags, position, detailedPosition, publishingDate,
    primaryPositionType, secondaryPositionType, radius } = ctx.request.body;
    console.dir(ctx.request.body);
    const userPlace = new UserPlace({
        username, name, description, tags, position, detailedPosition, publishingDate,
        primaryPositionType, secondaryPositionType, radius
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

exports.listUserRoads = async ctx => {
    try{
        const userRoads = await UserRoad.find().exec();
        if(!userRoads) {
            ctx.status = 404;
            return;
        }
        ctx.body = userRoads;
    } catch(e){
        ctx.throw(500, e);
    }
};

exports.findUserRoadByUserName = async ctx => {
    const {username} = ctx.params;
  try{
    const userRoad = await UserRoad.findByUsername(username).exec();
    if(!userRoad){
        ctx.status = 404;
        return;
    }
    ctx.body = userRoad;
  }catch(e){
      ctx.throw(500,e);
  }
};

exports.findUserPlaceByUserName = async ctx => {
    console.log('hello!');
    const {username} = ctx.params;
    try{
        const userplace = await UserPlace.findByUsername(username).exec();
        if(!userplace){
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
        const userplace = await UserPlace.findById({_id: id}).exec();
        if(!userplace){
            ctx.status = 404;
            return;
        }
        ctx.body = userplace;

    } catch(e){
        ctx.throw(500, e);
    }
};


exports.makeUserRoad = async ctx => {
    const { username, name, description, tags, position, detailedPosition, publishingDate,
        primaryPositionType, secondaryPositionType, roadInfo } = ctx.request.body;
    console.dir(ctx.request.body);
    const userRoad = new UserRoad({
        username, name, description, tags, position, detailedPosition, publishingDate,
        primaryPositionType, secondaryPositionType, roadInfo
    });
    try{
        await userRoad.save();
        ctx.body = userRoad;
    } catch(e) {
        ctx.throw(500, e);
    }
};

exports.findUserPlaceByType = async ctx => {
    const { primary}  = ctx.params;
    try{
        const userplace = await UserPlace.findByType(primary).exec();
        if(!userplace){
            ctx.status = 404;
            return;
        }
        ctx.body = userplace;
    } catch(e){
        ctx.throw(500, e);
    }
};
