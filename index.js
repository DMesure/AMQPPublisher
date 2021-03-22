const express = require('express');
const app = express();


var args = require('./options.js').options({
    't': { alias: 'topic', default: 'testtopic', describe: 'name of topic to which messages are sent'},
    'h': { alias: 'host', default: 'localhost', describe: 'dns or ip name of server where you want to connect'},
    'p': { alias: 'port', default: 61616, describe: 'port to connect to'},
    'u' : { alias: 'username', default: 'artemis', describe: 'username to connect to artemis instance'},
    'pw': { alias: 'password', default: 'simetraehcapa', describe: 'password to connect to artemis instance'}
}).usage('Usage: $0 [options] <messages>').help('help').argv;



app.get('/', (req, res) => {
    console.log('Publisher received a request.');

    var connection = require('rhea').connect({ port: args.port, host: args.host, username: args.username, password: args.password });

    var sender = connection.open_sender(args.topic);
    sender.on('sendable', function(context) {
    for (var i = 0; i < args._.length; i++) {
        var msg = "test";
        console.log('sent ' + msg);
        sender.send({body: msg});
    }
    connection.close();
    });

    res.send(`This is the publisher endpoint`);
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