// Put player id in local storage
export function receiveJoinGame(socket) {
  socket.on('join_game', (play) => {
    localStorage.setItem('myId', play.id);
  });
}

/*
* Desktop Actions
*/
export function createGame(socket) {
  socket.emit('create_game', {});
}

export function startGame(socket, gameId) {
  socket.emit('start_game', { gameId });
}

/*
* Mobile Actions
*/
export function joinGame(socket, code, name) {
  socket.emit('join_game', { code, name });
}

export function submitAnswer(socket, gameId, questionId, answerId, answer) {
  socket.emit('submit_answer', {
    gameId, questionId, answerId, answer,
  });
}

export function submitVote(socket, gameId, questionId, answerId, playerId) {
  socket.emit('submit_vote', {
    gameId, questionId, answerId, playerId,
  });
}

// https://stackoverflow.com/questions/3458553/javascript-passing-parameters-to-a-callback-function
export function moveOnEvent(socket, history, event, page, callback, callbackArgs) {
  socket.on(event, () => {
    if (callback) {
      callback.apply(this, callbackArgs); // Pass context so console.log works
    }
    history.push(page);
  });
}
