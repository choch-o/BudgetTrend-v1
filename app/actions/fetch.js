import fetch from 'isomorphic-fetch'

export const REQUEST_PROGRAMS = 'REQUEST_PROGRAMS'
export const RECEIVE_PROGRAMS = 'RECEIVE_PROGRAMS'
export const SELECT_YEAR = 'SELECT_YEAR'
export const INVALIDATE_YEAR = 'INVALIDATE_YEAR'
export function selectYear(year) {
  return {
    type: SELECT_YEAR,
    year
  }
}

export function invalidateYear(year) {
  return {
    type: INVALIDATE_YEAR,
    year
  }
}
function requestPrograms(year) {
  return {
    type: REQUEST_PROGRAMS,
    year
  }
}

function receivePrograms(year, json) {
  return {
    type: RECEIVE_PROGRAMS,
    year,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPrograms(year) {
  return dispatch => {
    dispatch(requestPrograms(year))
    console.log(year)
    return fetch(`http://openapi.openfiscaldata.go.kr/ExpenditureBudgetInit?FSCL_YY=${year}`, {
          mode: 'cors'
        }
      )
      .then(response => response.json())
      .then(json => dispatch(receivePrograms(year, json)))
  }
}

function shouldFetchPrograms(state, year) {
  const programs = state.programsByYear[year]
  if (!programs) {
    return true
  } else if (programs.isFetching) {
    return false
  } else {
    return programs.didInvalidate
  }
}

export function fetchProgramsIfNeeded(year) {
  return (dispatch, getState) => {
    if (shouldFetchPrograms(getState(), year)) {
      return dispatch(fetchPrograms(year))
    }
  }
}
