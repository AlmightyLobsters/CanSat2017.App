import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import { serialCommunicate } from './helpers';

const routerHistory = syncHistoryWithStore(hashHistory, store);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

/* establishing serial connection */
serialCommunicate();

ReactDOM.render(
    <Provider store={store}>
        <Router history={routerHistory} routes={routes} />
    </Provider>,
  rootElement
);
