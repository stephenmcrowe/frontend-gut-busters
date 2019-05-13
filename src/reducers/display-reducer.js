import { ActionTypes } from '../actions';

// code taken from postReducer --> scaffolding for display
const initialState = {
  all: [],
  post: {},
};

const DisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, { post: action.payload });
    case ActionTypes.UPDATE_POST:
      return Object.assign({}, state, { post: action.payload });
    default:
      return state;
  }
};

export default DisplayReducer;
