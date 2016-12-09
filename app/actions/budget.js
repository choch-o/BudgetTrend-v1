/*
 * action types
 */
export const ADD_PROGRAM = 'ADD_PROGRAM'
export const TOGGLE_PROGRAM = 'TOGGLE_PROGRAM'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */
export function addProgram(text) {
  return {
    type: ADD_PROGRAM,
    text
  }
}

export function toggleProgram(index) {
  return { type: TOGGLE_PROGRAM, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
