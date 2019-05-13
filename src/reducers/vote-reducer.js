import { ActionTypes } from '../actions';
// method taken from CountReducer --> scaffolding for counting votes
const VoteReducer = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default VoteReducer;
