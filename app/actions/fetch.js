// import fetch from 'isomorphic-fetch'
import request from 'superagent'
let jsonp = require('superagent-jsonp')
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
  console.log("RECEIVE PROGRAMS")
  console.log(json)
  return {
    type: RECEIVE_PROGRAMS,
    year,
    programs: json.body.ExpenditureBudgetAdd[1].row
  }
}

function fetchPrograms(year) {
  return dispatch => {
    dispatch(requestPrograms(year))
    var pStart = 1;
    var pEnd = 5;
    var pIndices = new Array();
    for (var i = pStart; i <= pEnd; i++) {
      pIndices.push(i);
    }
    pIndices.shuffle();
    request.get('http://openapi.openfiscaldata.go.kr/ExpenditureBudgetAdd?key=CNGZY1000038620161201092911MGTCR&FSCL_YY=2015&FLD_NM=교육&type=json&pIndex=' + pIndices.pop() + '&pSize=20')
        .use(jsonp)
        .end(function(err, response) {
          if (err) return console.error(err);
          console.log("RESPONSE");
          console.log(response);
          dispatch(receivePrograms(year, response));
        })
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

function arrayShuffle () {
  var i = this.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
}

Array.prototype.shuffle = arrayShuffle;


export function fetchProgramsIfNeeded(year) {
  return (dispatch, getState) => {
    if (shouldFetchPrograms(getState(), year)) {
      return dispatch(fetchPrograms(year))
    }
  }
}
