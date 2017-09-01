import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
// import budget from './budget';
import { selectedCategory, selectedPromise, programsByCategory } from './fetch'
import { selectedPrograms } from './budget'
import { popularTags } from './result'
// import programsByYear from './fetch'

export default combineReducers({
  messages,
  auth,
  selectedCategory,
  programsByCategory,
  selectedPrograms,
  popularTags,
  selectedPromise
});
