import UserPlace from "../../models/userPlace"

const userPlaceList = [
    {
        name: "첫번쨰 이름",
        description: "첫번째 설명",
        tags: ["태그1", "태그2"],
        position: {lat: 30, lng: 123}
    },
];

exports.makeUserPlace = async ctx => {
    const { name, description, tags, position } = ctx.request.body;
    const userPlace = new UserPlace({
        name, description, tags, position
    });
    try{
        await userPlace.save();
        ctx.body = userPlace;
    } catch(e) {
        ctx.throw(500, e);
    }
};

exports.listUserPlace = ctx => {
    ctx.body = userPlaceList;
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
