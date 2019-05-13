import { combineReducers } from 'redux';
import DisplayReducer from './display-reducer';
import VoteReducer from './vote-reducer';
import SubmitReducer from './submit-reducer';

const rootReducer = combineReducers({
  display: DisplayReducer,
  votes: VoteReducer,
  submit: SubmitReducer,
});

export default rootReducer;
