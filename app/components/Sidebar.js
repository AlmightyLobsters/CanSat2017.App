import React from 'react';
import { Link } from 'react-router';

const Sidebar = _ => (
    <div id="sidebar">
        <ul className="navbar">
            <li>
                <Link to="/"><i className="fa fa-tachometer"></i>Dashboard</Link>
            </li>
            <li>
                <Link to="/map"><i className="fa fa-map"></i>Map</Link>
            </li>
            <li>
                <Link to="/graphs"><i className="fa fa-area-chart"></i>Graphs</Link>
            </li>
            <li>
                <Link to="/gallery"><i className="fa fa-camera"></i>Gallery</Link>
            </li>
            <li>
                <Link to="/terminal"><i className="fa fa-terminal"></i>Terminal</Link>
            </li>
            <li>
                <Link to="/settings"><i className="fa fa-cog"></i>Settings</Link>
            </li>
        </ul>
    </div>
);

export default Sidebar;
