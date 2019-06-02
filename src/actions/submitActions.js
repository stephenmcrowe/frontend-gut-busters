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
export function submitAnswer(socket, gameId, questionId, answerId, answer) {
  socket.emit('submit_answer', {
    gameId, questionId, answerId, answer,
  });
  // console.log('emaited answer', answer);
}

export function moveOn(socket, history, page) {
  // console.log(socket);
  // console.log(history);
  // console.log(page);
  // console.log('moveOn activated');
  history.push(`/${page}`);

  // socket.emit('move_on', () => {
  //   history.push(`/${page}`);
  // });
}

export function startVoting(socket, qstArray) {
  socket.emit('start_voting', qstArray);
}

export function submitVote(socket, gameId, questionId, answerId, playerId) {
  socket.emit('submit_vote', {
    gameId, questionId, answerId, playerId,
  });
}

export function receiveVote(socket) {
  return socket.on('vote', (idx) => {
    localStorage.setItem('myIdx', idx);
    return idx;
  });
}


export function joinGame(socket, code, name) {
  socket.emit('join_game', { code, name });
}

export function pushStage(socket, history) {
  socket.on('start_game', (game) => {
    history.push('/mobile/answer');
  });

  socket.on('answer', (game) => {
    history.push('/mobile/answer');
  });

  socket.on('vote', (game) => {
    history.push('/mobile/vote');
  });
}
