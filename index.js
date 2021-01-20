require('dotenv/config');

const multer = require('multer');
const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const app = express();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

const storage = multer.memoryStorage({
    destination: function(req, file, callback){
        callback(null, '');
    }
});

const upload = multer({storage}).single('image');

app.post('/upload', upload, (req, res) => {
    const myFile = req.file.originalname.split('');
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            return res.status(500).send(error);
        }

        res.status(200).send(data);
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at http://localhost:${server.address().port}`);
});
