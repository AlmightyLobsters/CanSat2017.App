import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import Graphs from './components/Graphs';
import Gallery from './components/Gallery';
import Terminal from './components/Terminal';
import Settings from './components/Settings';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/map" component={Map} />
        <Route path="/graphs" component={Graphs} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/terminal" component={Terminal} />
        <Route path="/settings" component={Settings} />
    </Route>
);
