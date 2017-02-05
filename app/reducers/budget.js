import { combineReducers } from 'redux'
import { ADD_PROGRAM, DELETE_PROGRAM, TOGGLE_PROGRAM, SAVE_SELECTED_PROGRAMS, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/budget'
import request from 'superagent' 
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function selectedPrograms(state = [], action) {
  switch (action.type) {
    case ADD_PROGRAM:
      console.log("ADD PROGRAM")
      return [
        ...state,
        {
          name: action.name,
          value: action.value
        }
      ]
    case DELETE_PROGRAM:
      console.log("DELETE PROGRAM")
      state.splice(action.index, 1)
      return state
    case SAVE_SELECTED_PROGRAMS:
      console.log("SAVE SELECTED PROGRAMS")
      console.log(action.programs)
      request
        .post('/api/save')
        .send(action.programs)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err || !res.ok) {
            console.log("error in saving")
          } else {
            console.log(JSON.stringify(res.body));
          }
        })
      return state
    default:
      return state
  }
}

export { selectedPrograms }
/*
const programApp = combineReducers({
  visibilityFilter,
  programs
})

export default programApp
*/
