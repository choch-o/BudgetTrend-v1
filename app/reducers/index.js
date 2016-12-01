import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import budgets from './budgets';
import loading from './loading';

export default combineReducers({
  messages,
  auth,
  budgets,
  loading
});
