// import fetch from 'isomorphic-fetch'
import request from 'superagent'
let jsonp = require('superagent-jsonp')
export const REQUEST_PROGRAMS = 'REQUEST_PROGRAMS'
export const RECEIVE_PROGRAMS = 'RECEIVE_PROGRAMS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_PROMISE = 'SELECT_PROMISE'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

function selectPromise(promise) {
  return {
    type: SELECT_PROMISE,
    promise
  }
}

export function selectAndFetch(category) {
  return dispatch => {
    dispatch(selectPromise(category))
    dispatch(selectCategory(getCategoryName(category)))
    dispatch(fetchProgramsIfNeeded(getCategoryName(category), 1))
  }
}

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}
function requestPrograms(category) {
  return {
    type: REQUEST_PROGRAMS,
    category
  }
}

function receivePrograms(category, json) {
  console.log("RECEIVE PROGRAMS")
  console.log(json)
  return {
    type: RECEIVE_PROGRAMS,
    category,
    programs: json.body.ExpenditureBudgetAdd[1].row,
  }
}

function getCategoryName(category) {
  switch(category) {
    case 1:
      return "사회복지" 
    case 2:
      return "사회복지"
    case 3:
      return "교육"
    case 4:
      return "보건"
    case 5:
      return "문화및관광"
    case 6:
      return "사회복지"
    case 7:
      return "사회복지"
    case 8:
      return "사회복지"
    case 9:
      return "산업·중소기업및에너지"
    case 10:
      return "국토및지역개발"
  }
}

function fetchPrograms(category, pIndex) {
  return dispatch => {
    dispatch(requestPrograms(category))
    request.get('http://openapi.openfiscaldata.go.kr/ExpenditureBudgetAdd?key=CNGZY1000038620161201092911MGTCR&FSCL_YY=2015&FLD_NM=' + category + '&type=json&pIndex=' + pIndex + '&pSize=20')
        .use(jsonp)
        .end(function(err, response) {
          if (err) return console.error(err);
          console.log("RESPONSE");
          console.log(response);
          dispatch(receivePrograms(category, response));
        })
  }
}

function shouldFetchPrograms(state, category) {
  const programs = state.programsByCategory[category]
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


export function fetchProgramsIfNeeded(category, pIndex) {
  return (dispatch, getState) => {
    if (shouldFetchPrograms(getState(), category)) {
      return dispatch(fetchPrograms(category, pIndex))
    }
  }
}
