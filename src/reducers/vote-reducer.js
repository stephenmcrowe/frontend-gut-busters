// Legacy

import { ActionTypes } from '../actions';
// method taken from CountReducer --> scaffolding for counting votes
const VoteReducer = (state = { index: null }, action) => {
  switch (action.type) {
    case ActionTypes.VOTE_STAGE:
      return Object.assign({}, state, { index: action.payload });
    default:
      return state;
  }
};

export default VoteReducer;
