import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  FETCH_QUESTION: 'FETCH_QUESTION',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  CREATE_QUESTION: 'CREATE_QUESTION',
  START_GAME: 'START_GAME',
  JOIN_GAME: 'JOIN_GAME',
  START_ROUND: 'START_ROUND',
  SUBMIT_VOTE: 'SUBMIT_VOTE',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
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

export function fetchQuestions() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_QUESTIONS, payload: response.data });
      }).catch((error) => {
        console.log(error);
      });
  };
}


export function fetchQuestion(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_QUESTION, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createQuestion(question, history) {
  return (dispatch) => {
    // console.log('bye');
    axios.post(`${ROOT_URL}/`, question)
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_QUESTION, payload: response.data });
        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
  };
}

/*
* Desktop Actions
*/
export function startGame() {
  return {
    type: ActionTypes.START_GAME,
    payload: null,
  };
}

export function restartGame() {
  return {
    type: ActionTypes.RESTART_GAME,
    payload: null,
  };
}

/*
* Mobile Actions
*/
export function joinGame() {
  return {
    type: ActionTypes.JOIN_GAME,
    payload: null,
  };
}

export function startRound() {
  return {
    type: ActionTypes.START_ROUND,
    payload: null,
  };
}

export function submitAnswer(history) {
  return {
    type: ActionTypes.SUBMIT_ANSWER,
  };
}

export function submitVote(history) {
  return {
    type: ActionTypes.SUBMIT_VOTE,
  };
}
