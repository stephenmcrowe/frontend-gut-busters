import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  FETCH_QUESTION: 'FETCH_QUESTION',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  CREATE_QUESTION: 'CREATE_QUESTION',
};

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
