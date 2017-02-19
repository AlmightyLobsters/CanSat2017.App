import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';

import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import Graphs from './components/Graphs';
import Map from './components/Map';
import Terminal from './components/Terminal';
import Settings from './components/Settings';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginPage} />
        <Route path="loggedin" component={LoggedInPage} />
    </Route>
);
