import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
// import budget from './budget';
import { selectedYear, programsByYear } from './fetch'
import { selectedPrograms } from './budget'
import { popularTags } from './result'
// import programsByYear from './fetch'

console.log(selectedYear)
export default combineReducers({
  messages,
  auth,
  selectedYear,
  programsByYear,
  selectedPrograms,
  popularTags
});
