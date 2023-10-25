import { combineReducers } from 'redux';
import user from './user'; 
import travel from './travel';

const rootReducer = combineReducers({
  user: user, 
  travel: travel,
});

export default rootReducer;
