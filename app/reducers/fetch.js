import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY, REQUEST_PROGRAMS, RECEIVE_PROGRAMS
} from '../actions/fetch'

function selectedCategory(state = "교육", action) {
  switch (action.type) {
  case SELECT_CATEGORY:
    return action.category
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
    case INVALIDATE_CATEGORY:
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

function programsByCategory(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_PROGRAMS:
    case REQUEST_PROGRAMS:
      return Object.assign({}, state, {
        [action.category]: programs(state[action.category], action)
      })
    default:
      return state
  }
}

export { selectedCategory, programsByCategory }
