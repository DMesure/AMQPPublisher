const express = require('express');
const app = express();
const {rheaPublish} = require('./rhea');

app.get('/', (req, res) => {
    console.log('Publisher received a request.');

    res.send(`This is the publisher endpoint`);
});

app.get('/:data', (req, res) => {
    let data = req.params.data;
    console.log(data);
    rheaPublish(data);
    res.send({ 'data': data });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Publisher listening on port', port);
});