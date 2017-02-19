import React from 'react';
import { Link } from 'react-router';

const Sidebar = _ => (
    <div id="sidebar">
        Sidebar!
        <ul>
            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/map">Map</Link>
            </li>
            <li>
                <Link to="/graphs">Graphs</Link>
            </li>
            <li>
                <Link to="/gallery">Gallery</Link>
            </li>
            <li>
                <Link to="/terminal">Terminal</Link>
            </li>
            <li>
                <Link to="/settings">Settings</Link>
            </li>
        </ul>
    </div>
);

export default Sidebar;
