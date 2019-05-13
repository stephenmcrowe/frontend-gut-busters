import { ActionTypes } from '../actions';

// code taken from postReducer --> scaffolding for display
const initialState = {
  all: [],
  question: {},
};

const DisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_QUESTIONS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.FETCH_QUESTION:
      return Object.assign({}, state, { question: action.payload });
    default:
      return state;
  }
};

export default DisplayReducer;
