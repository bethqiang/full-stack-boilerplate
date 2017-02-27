/* global document */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import App from './components/App';
import Login from './components/Login';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
