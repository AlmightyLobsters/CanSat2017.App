import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import Graphs from './components/Graphs';
import Gallery from './components/Gallery';
import Terminal from './components/Terminal';
import Settings from './components/Settings';

const galleryImages = [
    'DSC_6329.jpg',
    'DSC_6333.jpg',
    'DSC_6338.jpg',
    'DSC_6643.jpg',
    'DSC_6648.jpg',
    'DSC_6677.jpg',
    'DSC_6684.jpg',
    'DSC_6689.jpg',
    'DSC_6702.jpg',
    'DSC_6709.jpg',
    'DSC_6710.jpg',
    'DSC_6711.jpg',
    'DSC_6711m.jpg',
    'DSC_6712.jpg',
    'DSC_6713.jpg',
    'DSC_6722.jpg',
    'DSC_6724.jpg',
    'DSC_6728.jpg',
    'DSC_6731.jpg',
    'DSC_6732.jpg',
    'DSC_6740.jpg',
    'DSC_6748.jpg',
    'DSC_6753.jpg',
    'DSC_6758.jpg',
    'DSC_6832.jpg',
    'DSC_6841.jpg',
    'DSC_6844.jpg'
];

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/map" component={Map} />
        <Route path="/graphs" component={Graphs} />
        <Route path="/gallery" component={Gallery} images={galleryImages} />
        <Route path="/terminal" component={Terminal} />
        <Route path="/settings" component={Settings} />
    </Route>
);
