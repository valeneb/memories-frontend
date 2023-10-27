import { combineReducers } from 'redux';
import user from './user'; 
import travel from './travel';
import diary from './diary';

const rootReducer = combineReducers({
  user: user, 
  travel: travel,
  diary: diary
});

export default rootReducer;
