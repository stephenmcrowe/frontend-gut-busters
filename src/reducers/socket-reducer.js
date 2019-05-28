import { SocketActionTypes } from '../actions/submitActions';
// import { ActionTypes } from '../actions';

const initialState = {
  game: {},
  test: 0,
};

const SocketReducer = (state = initialState, action) => {
  switch (action.typs) {
    /*
    // Client emits to server - not sure we need state update
    case SocketActionTypes.CREATE_GAME:
      return Object.assign({}, state, { game: action.payload });
    case SocketActionTypes.START_GAME:
      return Object.assign({}, state, { game: action.payload });
    case SocketActionTypes.CREATE_PLAYER:
      return Object.assign({}, state, { game: action.payload });
    case SocketActionTypes.SUBMIT_ANSWER:
      return Object.assign({}, state, { game: action.payload });
    case SocketActionTypes.SUBMIT_VOTE:
      return Object.assign({}, state, { game: action.payload });
    // Server emits to client - not sure we have any functions besides updating entire game object
    case SocketActionTypes.UPDATE_GAME:
      return Object.assign({}, state, { game: action.payload });
    */
    case SocketActionTypes.FETCH_GAME:
      return Object.assign({}, state, { game: action.payload });
    // Default
    default:
      return state;
  }
};

export default SocketReducer;
