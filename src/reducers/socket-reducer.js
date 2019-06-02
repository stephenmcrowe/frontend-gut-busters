import { ActionTypes } from '../actions/index';

const SocketReducer = (state = { game: null, stage: null, currVote: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, { game: action.payload });
    case ActionTypes.CURR_VOTE:
      return Object.assign({}, state, { currVote: action.payload });
      // Default
    default:
      return state;
  }
};

export default SocketReducer;
