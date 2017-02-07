import { combineReducers } from 'redux'
import { GET_POPULAR_TAGS } from '../actions/result'
import request from 'superagent'

function popularTags(state = {
  popularTags: []
}, action) {
  switch (action.type) {
    case GET_POPULAR_TAGS:
      return Object.assign({}, state, {
        popularTags: action.popularTags
      })
    default:
      return state
  }
}

export { popularTags }
