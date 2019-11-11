import multer from 'multer';
import moment from 'moment';
import asyncBusboy from 'async-busboy';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');  // 파일이 저장되는 경로입니다.
    },
    filename: function(req, file, cb) {
        cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);  // 저장되는 파일명
    }
});

exports.upload2 = async ctx => {
    const {files, fields} = await asyncBusboy(ctx.req);
    console.dir(files);
    //const file = ctx.request.files.file;
    /*
    const { key, url } = await s({
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
    });
    */

    //ctx.body = { key, url };

};

export const fileUpload = multer({ storage: storage }).single("file");   // single : 하나의 파일업로드 할때

