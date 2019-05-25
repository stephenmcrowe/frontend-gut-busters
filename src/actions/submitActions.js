import axios from 'axios';
import io from 'socket.io-client';
import { Action } from 'rxjs/internal/scheduler/Action';

// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  CREATE_GAME: 'CREATE_GAME',
  START_GAME: 'START_GAME',
  CREATE_PLAYER: 'CREATE_PLAYER',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  SUBMIT_VOTE: 'SUBMIT_VOTE',
  GAME: 'GAME',
};

// const ROOT_URL = 'https://gut-busters.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';

export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}

/* Game Functions (Sending) */
// socket.emit inside actions
export function submitAnswer(questionid, answerid, text) {
  return {
    type: ActionTypes.SUBMIT_ANSWER,
    payload: null,
  };
}

export function submitVote(questionid, answerid) {
  return {
    type: ActionTypes.SUBMIT_VOTE,
    payload: null,
  };
}


/* Game Functions (Receiving) */
// socket.on in components


/* Joining Functions */
export function createGame() {


}

export function startGame() {

}
