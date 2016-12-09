import { combineReducers } from 'redux'
import { ADD_PROGRAM, TOGGLE_PROGRAM, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/budget'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function programs(state = [], action) {
  switch (action.type) {
    case ADD_PROGRAM:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_PROGRAM:
      return state.map((program, index) => {
        if (index === action.index) {
          return Object.assign({}, program, {
            completed: !program.completed
          })
        }
        return program
      })
    default:
      return state
  }
}

const programApp = combineReducers({
  visibilityFilter,
  programs
})

export default programApp
