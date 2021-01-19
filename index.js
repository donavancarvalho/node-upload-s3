const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at http://localhost:${server.address().port}`);
});
