require('dotenv').config();

let args = require('./options.js').options({
    't': { alias: 'topic', default: process.env.AMQP_TOPIC, describe: 'name of topic to which messages are sent'},
    'h': { alias: 'host', default: process.env.AMQP_HOST, describe: 'dns or ip name of server where you want to connect'},
    'p': { alias: 'port', default: process.env.AMQP_PORT, describe: 'port to connect to'},
    'u' : { alias: 'username', default: process.env.ARTEMIS_USERNAME, describe: 'username to connect to artemis instance'},
    'pw': { alias: 'password', default: process.env.ARTEMIS_PASSWORD, describe: 'password to connect to artemis instance'}
}).usage('Usage: $0 [options] <messages>').help('help').argv;


const rheaPublish = (msg) => {
    let connection = require('rhea').connect({ port: args.port, host: args.host, username: args.username, password: args.password });

    let sender = connection.open_sender(args.topic);
    sender.on('sendable', function(context) {
    // for (let i = 0; i < args._.length; i++) {
    //     let msg = "test";
    //     console.log('sent ' + msg);
    //     sender.send({body: msg});
    // }
        console.log('sent ' + msg);
        sender.send({body: msg});
    connection.close();
    });
}

module.exports = { rheaPublish }