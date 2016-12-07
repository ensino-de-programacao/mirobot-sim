#!/usr/bin/env node

var Server  = require('ws').Server,
s       = new Server({port: 8899}),
Mirobot = require('./lib/mirobot.js').Mirobot,
m       = new Mirobot();

console.log("Server stated!");

s.on('connection', function(ws) {
    console.log("# New Connection");

    var respond = function(msg){
        message = JSON.stringify(msg);
        console.log('=> Send message: %s', message);
        ws.send(message);
    }

    ws.on('message', function(data, flags) {
        msg = JSON.parse(data)
        console.log("=> Received message: %s", JSON.stringify(msg));
        m.handle_msg(msg, respond);
    });
});
