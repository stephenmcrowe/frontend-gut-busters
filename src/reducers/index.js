import { combineReducers } from 'redux';
// import DisplayReducer from './display-reducer';
// import CountReducer from './count-reducer';
import SocketReducer from './socket-reducer';

const rootReducer = combineReducers({
  // count: CountReducer,
  // display: DisplayReducer,
  socket: SocketReducer,
});

export default rootReducer;
