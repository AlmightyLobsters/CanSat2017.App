import React from 'react';
import Sidebar from './Sidebar';

const App = ({ children }) => (
    <div id="app">
        <Sidebar />
        <div id="detail">
            {children}
        </div>
    </div>
);

export default App;
