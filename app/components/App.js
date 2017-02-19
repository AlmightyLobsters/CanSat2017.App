import React from 'react';
import Sidebar from './Sidebar';

export const App = ({ children }) => (
    <div id="app">
        <Sidebar />
        {children}
    </div>
);
