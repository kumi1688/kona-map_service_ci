import UserRoad from "../../models/userRoad";
import UserPlace from "../../models/userPlace";

export const getUserPlaceList = async ctx => {
    try{
        const response = await UserPlace.find().exec();
        if(!response){
            ctx.status = 404;
            return;
        }
        ctx.body = response;
    }catch(e){
        ctx.throw(500, e);
    }
};

export const getUserRoadList = async ctx => {
    try{
        const response = await UserRoad.find().exec();
        if(!response){
            ctx.status = 404;
            return;
        }
        ctx.body = response;
    }catch(e){
        ctx.throw(500, e);
    }
};



export const getUserRoadStatistics = async ctx => {
    let statistics = {totalNumber : 0};
    try{
        const data = await UserRoad.find().exec();
        //총 갯수
        statistics.totalNumber = data.length;

        ctx.body = statistics;
    }catch(e){
        ctx.throw(500, e);
    }
};

export const getUserPlaceStatistics = async ctx => {
    let statistics = {totalNumber: 0};
    try{
        const data = await UserPlace.find().exec();
        //총 갯수
        statistics.totalNumber = data.length;

        //분류별 인원
        ctx.body = statistics;
    }catch(e){
        ctx.throw(500, e);
    }
};
