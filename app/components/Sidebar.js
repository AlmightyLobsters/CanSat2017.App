import React from 'react';
import { Link } from 'react-router';

const toggleSidepanel = () => {
    document.getElementById('sidebar').classList.toggle('expanded');
    document.getElementById('detail').classList.toggle('expanded');
}

const Sidebar = _ => (
    <div id="sidebar" className="expanded">
        <ul className="navbar">
            <section className="top">
                <li>
                    <a style={{fontFamily: 'Novecento Bold'}} onClick={e => toggleSidepanel()}><i className="fa fa-bars fa-fw fa-2x"></i><label>Marigold</label></a>
                </li>
                <li className="active">
                    <Link to="/"><i className="fa fa-tachometer fa-fw fa-2x"></i><label>Dashboard</label></Link>
                </li>
                <li>
                    <Link to="/map"><i className="fa fa-map fa-fw fa-2x"></i><label>Map</label></Link>
                </li>
                <li>
                    <Link to="/graphs"><i className="fa fa-area-chart fa-fw fa-2x"></i><label>Graphs</label></Link>
                </li>
                <li>
                    <Link to="/gallery"><i className="fa fa-camera fa-fw fa-2x"></i><label>Gallery</label></Link>
                </li>
                <li>
                    <Link to="/terminal"><i className="fa fa-terminal fa-fw fa-2x"></i><label>Terminal</label></Link>
                </li>
            </section>
            <section className="bottom">
                <li>
                    <Link to="/settings"><i className="fa fa-cog fa-fw fa-2x"></i><label>Settings</label></Link>
                </li>
            </section>
        </ul>
    </div>
);

export default Sidebar;
