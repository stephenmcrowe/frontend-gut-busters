import { combineReducers } from 'redux';
// import DisplayReducer from './display-reducer';
import SocketReducer from './socket-reducer';

const rootReducer = combineReducers({
  // display: DisplayReducer,
  socket: SocketReducer,
});

export default rootReducer;
