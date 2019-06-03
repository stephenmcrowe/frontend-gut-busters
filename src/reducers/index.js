import { combineReducers } from 'redux';
// import DisplayReducer from './display-reducer';
import SocketReducer from './socket-reducer';
import VoteReducer from './vote-reducer';

const rootReducer = combineReducers({
  // display: DisplayReducer,
  socket: SocketReducer,
  vote: VoteReducer,
});

export default rootReducer;
