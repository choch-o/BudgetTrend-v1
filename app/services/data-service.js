import request from 'superagent'

const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
  case 'GET_BUDGET_DATA':
    /*
    In case we receive an action to send an API request, send the appropriate request
    */
    request
      .get('http://openapi.openfiscaldata.go.kr/ExpenditureBudgetAdd?key=CNGZY1000038620161201092911MGTCR&type=json&FSCL_YY=2015')
      .withCredentials()
      .end((err, res) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'GET_BUDGET_DATA_ERROR',
            err
          })
        }
        const data = JSON.parse(res.text)
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        next({
          type: 'GET_BUDGET_DATA_RECEIVED',
          data
        })
      })
    break
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }

};

export default dataService
