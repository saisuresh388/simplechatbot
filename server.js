'use strict';
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || '5001';
var dt = new Date();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = app.listen(port,function()
{
    console.log("Port:",port);
});
// SocketIO
var io = require('socket.io').listen(server);
io.sockets.on('connection',(socket)=>{
    console.log("new conncetion",socket.id)
   socket.on('save-message',(data)=> {
    console.log("message is created",)
    var obj={};
    obj.msgtext=data;
    obj.id=socket.id;
    obj.date=dt;
    // store the object in the database
    io.emit('new-message', obj);
    });
  })
