/*
 * action types
 */
export const ADD_PROGRAM = 'ADD_PROGRAM'
export const DELETE_PROGRAM = 'DELETE_PROGRAM'
export const TOGGLE_PROGRAM = 'TOGGLE_PROGRAM'
export const SAVE_SELECTED_PROGRAMS = 'SAVE_SELECTED_PROGRAMS'
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
export function addProgram(name, value) {
  return {
    type: ADD_PROGRAM,
    name,
    value
  }
}

export function deleteProgram(index) {
  return {
    type: DELETE_PROGRAM,
    index
  }
}

export function toggleProgram(name, value) {
  return (dispatch, getState) => {
    var index = -1;
    for (var i = 0; i < getState().selectedPrograms.length; i++) {
      if (getState().selectedPrograms[i].name == name) {
        index = i
      }
    }
    if (index > -1) return dispatch(deleteProgram(index))
    else return dispatch(addProgram(name, value))
  }
}

export function saveSelectedPrograms(programs) {
  return {
    type: SAVE_SELECTED_PROGRAMS,
    programs
  } 
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
