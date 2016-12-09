import { combineReducers } from 'redux'
import {
  SELECT_YEAR, INVALIDATE_YEAR, REQUEST_PROGRAMS, RECEIVE_PROGRAMS
} from '../actions/fetch'

function selectedYear(state = 2015, action) {
  switch (action.type) {
  case SELECT_YEAR:
    return action.year
  default:
    return state
  }
}

function programs(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_YEAR:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_PROGRAMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_PROGRAMS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.programs,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function programsByYear(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_YEAR:
    case RECEIVE_PROGRAMS:
    case REQUEST_PROGRAMS:
      return Object.assign({}, state, {
        [action.year]: programs(state[action.year], action)
      })
    default:
      return state
  }
}

export { selectedYear, programsByYear }
