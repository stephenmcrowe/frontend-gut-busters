import { ActionTypes } from '../actions/index';

const SocketReducer = (state = { game: null, stage: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_GAME:
      return Object.assign({}, state, { game: action.payload });
    // Default
    default:
      return state;
  }
};

export default SocketReducer;
