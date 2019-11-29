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
        firstLivingArea: Joi.string(),
        secondLivingArea: Joi.string(),
        gender: Joi.string(),
        age: Joi.string(),
        //tags: Joi.array().items(Joi.string()).required(),
        providingInfo: Joi.bool(),
    });

    const result = Joi.validate(ctx.request.body, schema);
    console.dir(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }


    const { username, password, firstLivingArea, secondLivingArea, gender, age, providingInfo } = ctx.request.body;
    try{
        const exists = await User.findByUsername(username);
        if( exists ) {
            ctx.status = 409;
            return;
        }

        const user = new User({
            username, firstLivingArea, secondLivingArea, gender, age, providingInfo
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
    console.dir('login try');

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
        //
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

export const getTotalUserNumber = async ctx => {
    try{
        const userNumber = await User.getTotalNumber().exec();
        ctx.body = userNumber.length;
    }catch(e){
        ctx.throw(500, e);
    }
};
export const getManNumber = async ctx => {
    try{
        const manNumber = await User.getManNumber().exec();
        ctx.body = manNumber.length;
    } catch(e){
        ctx.throw(500, e);
    }
};

const firstLivingArea = ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong'];

const secondLivingArea = {
    seoul: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구',
        '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구',
        '강동구'],
    busan: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '강서구', '해운대구', '사하구',
        '금정구', '연제구', '수영구', '사상구'],
    daegu: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구'],
    incheon: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구'],
    gwangju: ['동구', '서구', '남구', '북구', '광산구'],
    daejeon: ['서구', '중구', '동구', '유성구', '대덕구'],
    ulsan: ['중구', '남구', '동구', '북구'],
    sejong: ['세종특별시'],
};

const initialState = {
    total: 0,
    gender : {man : 0, woman: 0},
    age : {zero: 0, one: 0, two: 0, three: 0, four:0, five: 0, six: 0, seven: 0, eight: 0, nine: 0},
    livingArea : {
        seoul : new Array(secondLivingArea.seoul.length+1),
        busan : new Array(secondLivingArea.busan.length+1),
        daegu : new Array(secondLivingArea.daegu.length+1),
        incheon : new Array(secondLivingArea.incheon.length+1),
        gwangju : new Array(secondLivingArea.gwangju.length+1),
        daejeon : new Array(secondLivingArea.daejeon.length+1),
        ulsan : new Array(secondLivingArea.ulsan.length+1),
        sejong : new Array(secondLivingArea.sejong.length+1),
    }
};

const initArray = (arr) => {
    for(let i = 0; i < arr.length; i++){
        arr[i] = 0;
    };
};

const initLivingArea = () => {
    initArray(initialState.livingArea.seoul);
    initArray(initialState.livingArea.busan);
    initArray(initialState.livingArea.daegu);
    initArray(initialState.livingArea.incheon);
    initArray(initialState.livingArea.gwangju);
    initArray(initialState.livingArea.daejeon);
    initArray(initialState.livingArea.ulsan);
    initArray(initialState.livingArea.sejong);
};

export const getUserStatistics = async ctx => {
    try{
        initLivingArea();
        let statistics = initialState;
        const data = await User.find().exec();
        // 총 인원
        statistics.total = data.length;

        data.forEach(function(element){
            //성별
            if(element.gender === '남성') statistics.gender.man++;
            else statistics.gender.woman++;

            // 나이
            switch(element.age){
                case '0': statistics.age.zero++; break;
                case '10': statistics.age.one++; break;
                case '20': statistics.age.two++; break;
                case '30': statistics.age.three++; break;
                case '40': statistics.age.four++; break;
                case '50': statistics.age.five++; break;
                case '60': statistics.age.six++; break;
                case '70': statistics.age.seven++; break;
                case '80': statistics.age.eight++; break;
                case '90': statistics.age.nine++; break;
                default : break;
            }

            let i;
            // 사는 지역
            switch(element.firstLivingArea){
                case '서울특별시' : {
                    statistics.livingArea.seoul[statistics.livingArea.seoul.length-1]++;
                  for(i = 0; i < secondLivingArea.seoul.length; i++) {
                      if(secondLivingArea.seoul[i] === element.secondLivingArea )
                          statistics.livingArea.seoul[i]++;
                  }
                  break;
                }
                case '부산광역시' : {
                    statistics.livingArea.busan[statistics.livingArea.seoul.busan-1]++;
                    for(i = 0; i < secondLivingArea.busan.length; i++) {
                        if(secondLivingArea.busan[i] === element.secondLivingArea )
                            statistics.livingArea.busan[i]++;
                    }
                    break;
                }
                case '대구광역시' : {
                    statistics.livingArea.daegu[statistics.livingArea.daegu.length-1]++;
                    for(i = 0; i < secondLivingArea.daegu.length; i++) {
                        if(secondLivingArea.daegu[i] === element.secondLivingArea )
                            statistics.livingArea.daegu[i]++;
                    }
                    break;
                }
                case '인천광역시' : {
                    statistics.livingArea.incheon[statistics.livingArea.incheon.length-1]++;
                    for(i = 0; i < secondLivingArea.incheon.length; i++) {
                        if(secondLivingArea.incheon[i] === element.secondLivingArea )
                            statistics.livingArea.incheon[i]++;
                    }
                    break;
                }
                case '광주광역시' : {
                    statistics.livingArea.gwangju[statistics.livingArea.gwangju.length-1]++;
                    for(i = 0; i < secondLivingArea.gwangju.length; i++) {
                        if(secondLivingArea.gwangju[i] === element.secondLivingArea )
                            statistics.livingArea.gwangju[i]++;
                    }
                    break;
                }
                case '대전광역시 ' : {
                    statistics.livingArea.daejeon[statistics.livingArea.daejeon.length-1]++;
                    for(i = 0; i < secondLivingArea.daejeon.length; i++) {
                        if(secondLivingArea.daejeon[i] === element.secondLivingArea )
                            statistics.livingArea.daejeon[i]++;
                    }
                    break;
                }
                case '울산광역시' : {
                    statistics.livingArea.ulsan[statistics.livingArea.ulsan.length-1]++;
                    for(i = 0; i < secondLivingArea.ulsan.length; i++) {
                        if(secondLivingArea.ulsan[i] === element.secondLivingArea )
                            statistics.livingArea.ulsan[i]++;
                    }
                    break;
                }
                case '세종특별시' : {
                    statistics.livingArea.sejong[statistics.livingArea.sejong.length-1]++;
                    for(i = 0; i < secondLivingArea.sejong.length; i++) {
                        if(secondLivingArea.sejong[i] === element.secondLivingArea )
                            statistics.livingArea.sejong[i]++;
                    }
                    break;
                }
            }
            // 지역별 통계 끝
        });
        ctx.body = statistics;
    }catch(e){
        ctx.throw(500, e);
    }
};
