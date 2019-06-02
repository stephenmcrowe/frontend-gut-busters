// Legacy

import { ActionTypes } from '../actions';
// method taken from CountReducer --> scaffolding for counting votes
const VoteReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.VOTE_STAGE:
      return action.payload;
    default:
      return state;
  }
};

export default VoteReducer;
