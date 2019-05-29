/* eslint-disable import/prefer-default-export */
// Source: Creating and subscribing to timers
// https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
function subscribeToTimer(socket, cb) {
  console.log('subscribeToTimer running');
  console.log(socket);
  console.log(cb);
  // start listening for time remaining updates
  socket.on('time_remaining', timestamp => cb(null, timestamp));
  // start timer
  socket.emit('create_timer');
  // socket.emit('subscribe_to_timer');
}

export { subscribeToTimer };
