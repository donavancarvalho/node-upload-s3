require('dotenv/config');

const multer = require('multer');
const express = require('express');

const app = express();

const storage = multer.memoryStorage({
    destination: function(req, file, callback){
        callback(null, '');
    }
});

const upload = multer({storage}).single('image');

app.post('/upload', upload, (req, res) => {
    console.log(req.file);

    res.send({
        message: 'Hello World'
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at http://localhost:${server.address().port}`);
});
