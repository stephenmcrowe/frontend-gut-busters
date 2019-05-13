import { combineReducers } from 'redux';
import DisplayReducer from './display-reducer';
// import VoteReducer from './vote-reducer';
// import SubmitReducer from './submit-reducer';

// const rootReducer = combineReducers({
//   display: DisplayReducer,
//   votes: VoteReducer,
//   submit: SubmitReducer,
// });

// export default rootReducer;

// the starting point for your redux store
// this defines what your store state will look like
import CountReducer from './count-reducer';

const rootReducer = combineReducers({
  count: CountReducer,
  display: DisplayReducer,
});

export default rootReducer;
