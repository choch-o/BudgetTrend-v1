import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import getRoutes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import dataService from './services/data-service';

// injectTapEventPlugin();
let store = configureStore();
//let store = createStore(budgetApp, {}, applyMiddleware(dataService));

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory} routes={getRoutes(store)}/>
  </Provider>,
  document.getElementById('app')
);

//store.dispatch({type: 'GET_BUDGET_DATA'})
