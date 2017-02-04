import { combineReducers } from 'redux'
import { ADD_PROGRAM, DELETE_PROGRAM, TOGGLE_PROGRAM, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/budget'
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
