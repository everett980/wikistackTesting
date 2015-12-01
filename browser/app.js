var socket = io(window.location.origin);
// console.log(Object.keys(socket).sort())

socket.on('connect', function () {
  console.log('I have made a persistent two-way connection to the server!');

  whiteboard.on('draw', function (start, end, strokeColor) {
    socket.emit('draw', start, end, strokeColor);
  });

  socket.on('drew', function (start, end, strokeColor) {
    whiteboard.draw(start, end, strokeColor);
  });
});
