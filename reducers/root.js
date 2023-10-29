import { combineReducers } from 'redux';
import user from './user';
import travel from './travel';
import diary from './diary';
import planning from './planning';

const rootReducer = combineReducers({
  user: user,
  travel: travel,
  diary: diary,
  planning: planning,
});

export default rootReducer;
