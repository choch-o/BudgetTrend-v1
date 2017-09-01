import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY, SELECT_PROMISE, INVALIDATE_CATEGORY, REQUEST_PROGRAMS, RECEIVE_PROGRAMS
} from '../actions/fetch'

function selectedCategory(state = 0, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function selectedPromise(state = 0, action) {
  console.log("selected category action")
  console.log(action)
  switch (action.type) { 
    case SELECT_PROMISE:
      console.log("reaches here?2")
      return action.promise
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

export { selectedCategory, selectedPromise, programsByCategory }
