// import axios from 'axios';
// import io from 'socket.io-client';

// keys for actiontypes
export const SocketActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  CREATE_GAME: 'CREATE_GAME',
  START_GAME: 'START_GAME',
  CREATE_PLAYER: 'CREATE_PLAYER',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  SUBMIT_VOTE: 'SUBMIT_VOTE',
  UPDATE_GAME: 'UPDATE_GAME',
};

// const ROOT_URL = 'https://gut-busters.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api'; USE ME

/* Demo Functions */
export function increment() {
  return {
    type: SocketActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: SocketActionTypes.DECREMENT,
    payload: null,
  };
}

/* Joining Functions */
export function createGame() {

}

export function startGame() {

}

export function createPlayer() {

}


/* Game Functions (Sending) */
// socket.emit inside actions
export function submitAnswer(questionid, answerid, text) {
  return {
    type: SocketActionTypes.SUBMIT_ANSWER,
    payload: null,
  };
}

export function submitVote(questionid, answerid) {
  return {
    type: SocketActionTypes.SUBMIT_VOTE,
    payload: null,
  };
}

/* Game Functions (Receiving) */
// socket.on in components
export function updateGame(game) {
  this.props.socket.emit('create_game', {});
}
