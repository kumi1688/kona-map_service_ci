import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import moment from "moment";
import fs from 'fs';

const s3 = new aws.S3({
    accessKeyId: 'AKIA4HW7VP75MYVQCKHI', // 생성한 s3의 accesskey
    secretAccessKey: 'jGyjDKWmr4kepl/E2g6l31MUpNqY2k/vBhR7si4r', // 생성한 s3의 secret key
    region: 'ap-northeast-2'  // 지역설정
});

const storage = multerS3({
    s3: s3,
    bucket: 'capstonbucket', // s3 생성시 버킷명
    acl: 'public-read',   // 업로드 된 데이터를 URL로 읽을 때 설정하는 값입니다. 업로드만 한다면 필요없습니다.
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname}); // 파일 메타정보를 저장합니다.
    },
    key: function (req, file, cb) {
        cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname) // key... 저장될 파일명과 같이 해봅니다.
    }
});

const uploadS3 = multer({storage: storage}).single("file");

let filePath = null;

export const upload = ctx => {
    const result = uploadS3(ctx.req, ctx.res, function (err) {
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return next(err);
        }
        //console.log('원본파일명 : ' + ctx.req.file.originalname);
        //console.log('저장파일명 : ' + ctx.req.file.filename);
        //console.log('크기 : ' + ctx.req.file.size);
        console.log('경로 : ' + ctx.req.file.location);
        filePath = ctx.req.file.location;
        ctx.res = filePath;
        return filePath;
    });
    console.dir(result);
    ctx.body = filePath;
    ctx.status = 200;
};

export const upload2 = async ctx => {
    const file = ctx.request.files.file;
    const {key, url} = await uploadFile({
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
    });
    ctx.body = {key, url};
};

const uploadFile = async ({fileName, filePath, fileType}) => {
    return new Promise((resolve, reject) => {
        aws.config.update({
            region: "ap-northeast-2",
            // You'll need your service's access keys here
            accessKeyId: "AKIA4HW7VP75MYVQCKHI",
            secretAccessKey: "jGyjDKWmr4kepl/E2g6l31MUpNqY2k/vBhR7si4r",
        });

        const s3 = new aws.S3({
            apiVersion: "2006-03-01",
            // If you want to specify a different endpoint, such as using DigitalOcean spaces
            // endpoint: new aws.Endpoint("nyc3.digitaloceanspaces.com"),
        });

        const stream = fs.createReadStream(filePath);
        stream.on("error", function (err) {
            reject(err);
        });

        s3.upload(
            {
                ACL: "public-read",
                // You'll input your bucket name here
                Bucket: "capstonbucket",
                Body: stream,
                Key: fileName,
                ContentType: fileType,
            },
            function (err, data) {
                if (err) {
                    reject(err);
                } else if (data) {
                    resolve({key: data.Key, url: data.Location});
                }
            }
        );
    });
};
