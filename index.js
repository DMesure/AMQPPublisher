const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Publisher received a request.');

    const target = process.env.TARGET || 'World';
    res.send(`Hello ${target}!\n`);
});

app.get('/test/:data', (req, res) => {
    let data = req.params.data;
    console.log(data);
    res.send({ 'data': data });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Publisher listening on port', port);
});