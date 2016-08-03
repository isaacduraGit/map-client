'use strict';

import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import Routes from './routes';
import '../styles/index.scss';
import mapReducer from './reducers/map';
import userReducer from './reducers/user';
import blogReducer from './reducers/blog';
import filtersReducer from './reducers/filters';
import appearenceReducer from './reducers/appearence';
import '../styles/application.scss';
import contactReducer from './reducers/contact';

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  routing: routerReducer,
  map: mapReducer,
  user: userReducer,
  blog: blogReducer,
  filters: filtersReducer,
  appearence: appearenceReducer,
  contactStatus: contactReducer
});


const middlewareRouter = routerMiddleware(browserHistory);

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const store = createStore(
  reducer,
  applyMiddleware(middlewareRouter),
  applyMiddleware(thunk)
);

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Routes history={history}/>
  </Provider>,
  document.getElementById('app')
);
