var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);
var io = socketio(server);

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var drawArrs = [];

io.on('connection', function (socket) {
  // console.log(Object.keys(socket).sort())
  drawArrs.forEach(function(drawArr) {
    socket.emit('drew', drawArr[0], drawArr[1]);
  })
  console.log('A new client has connected.');
  console.log(socket.id);

  socket.on('draw', function (start, end, strokeColor) {
    drawArrs.push([start, end, strokeColor]);
    socket.broadcast.emit('drew', start, end, strokeColor);
  })

  socket.on('disconnect', function () {
    console.log(':(')
  })

});
