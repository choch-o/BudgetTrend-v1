import { combineReducers } from 'redux'
import { ADD_PROGRAM, DELETE_PROGRAM, TOGGLE_PROGRAM, SAVE_SELECTED_PROGRAMS, SET_VISIBILITY_FILTER, VisibilityFilters, IS_SUBMITTED } from '../actions/budget'
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

function selectedPrograms(state = {
  isSubmitted: false,
  programs: []
}, action) {
  switch (action.type) {
    case ADD_PROGRAM:
      console.log("ADD PROGRAM")
      return {
        isSubmitted: false,
        programs: [
          ...state.programs,
          {
            label: action.label,
            value: action.value
          }
        ]
      }
    case DELETE_PROGRAM:
      console.log("DELETE PROGRAM")
      state.programs.splice(action.index, 1)
      return state
    case IS_SUBMITTED:
      console.log("IS SUBMITTED")
      console.log(state.isSubmitted)
      return state.isSubmitted
    case SAVE_SELECTED_PROGRAMS:
      console.log("SAVE SELECTED PROGRAMS")
      console.log(action.programs)
      Object.assign({}, action.programs, {
        isSubmitted: true
      })
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
      return Object.assign({}, state, {
        isSubmitted: true
      })
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
