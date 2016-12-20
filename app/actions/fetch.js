// import fetch from 'isomorphic-fetch'
import request from 'superagent';
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
  request.get('http://openapi.openfiscaldata.go.kr/ExpenditureBudgetAdd?key=CNGZY1000038620161201092911MGTCR&FSCL_YY=2015&type=json')
      .set('Accept', '*/*')
      .end(function(err, response) {
        if (err) return console.error(err);
        console.log("GET SUCCESS");
      });
  return year;
  /*
  return dispatch => {
    dispatch(requestPrograms(year))
    console.log(year)
    return fetch(`http://openapi.openfiscaldata.go.kr/ExpenditureBudgetAdd?key=CNGZY1000038620161201092911MGTCR&type=json&pIndex=1&pSize=100&FSCL_YY=${year}`, {
          mode: 'cors'
        }
      )
      .then(response => response.json())
      .then(json => dispatch(receivePrograms(year, json)))
  }
  */
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
      console.log("TEST");
      console.log(fetchPrograms(year));
      return 0;
      // return dispatch(fetchPrograms(year))
    }
  }
}
