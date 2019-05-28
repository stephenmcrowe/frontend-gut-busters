// import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  /* Lab stuff
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  FETCH_QUESTION: 'FETCH_QUESTION',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  CREATE_QUESTION: 'CREATE_QUESTION', */
  FETCH_GAME: 'FETCH_GAME',
  ANSWER_STAGE: 'ANSWER_STAGE',
  VOTE_STAGE: 'VOTE_STAGE',
  SCORE_STAGE: 'SCORE_STAGE',
  /* Don't think we need reducers for these... - Stephen
  START_GAME: 'START_GAME',
  JOIN_GAME: 'JOIN_GAME',
  START_ROUND: 'START_ROUND',
  SUBMIT_VOTE: 'SUBMIT_VOTE',
  SUBMIT_ANSWER: 'SUBMIT_ANSWER',
  */
};

// const ROOT_URL = 'https://gut-busters.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

/* Lab stuff
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
*/

export function fetchGame(socket) {
  return (dispatch) => {
    socket.on('game', (game) => {
      console.log(game);
      dispatch({
        type: ActionTypes.FETCH_GAME,
        payload: game,
      });
    });
  };
}

// const routes = {
//   vote: '/desktop/voting',
// };

// Unsure how best to transition to new stage rn, both on server and on frontend - Stephen.
// For now, these are the events we are listening to

// This isn't implemented (on server but is easy) and maybe we don't need it?!? - Stephen
export function answerStage(socket) {
  return socket.on('answer', (game) => {
    return {
      type: ActionTypes.ANSWER_STAGE,
      payload: game,
    };
  });
}

export function voteStage(socket) {
  return socket.on('vote', (game) => {
    return {
      type: ActionTypes.VOTE_STAGE,
      payload: game,
    };
  });
}

// This isn't implemented (on server) - Stephen
export function scoreStage(socket) {
  return socket.on('score', (game) => {
    return {
      type: ActionTypes.SCORE_STAGE,
      payload: game,
    };
  });
}

// Not sure if these (below) are actually necessary, but yeah. One central place for websocket stuff - Stephen

/*
* Desktop Actions
*/
export function createGame(socket) {
  socket.emit('create_game', {});
}

export function startGame(socket, gameId) {
  socket.emit('start_game', { gameId });
}

// What is this? Doesn't exist rn - Stephen
export function restartGame() {
  return {
    type: ActionTypes.RESTART_GAME,
    payload: null,
  };
}

/*
* Mobile Actions
*/
export function joinGame(socket, code, name) {
  socket.emit('join_game', { code, name });
}

/* lol wut? This not a thing
export function startRound() {
}
*/

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
