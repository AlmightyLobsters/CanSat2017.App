import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const toggleSidepanel = () => {
    document.getElementById('sidebar').classList.toggle('expanded');
    document.getElementById('detail').classList.toggle('expanded');
};

const activeIf = (value, assumption) => value === assumption ? ' active' : '';

const Sidebar = ({location}) => (
    <div id="sidebar" className="expanded">
        <ul className="navbar">
            <section className="top">
                <li>
                    <a style={{fontFamily: 'Novecento Bold'}} onClick={e => {toggleSidepanel();}}><i className="fa fa-bars fa-fw fa-2x"></i><label>Marigold</label></a>
                </li>
            </section>
            <section className="core">
                <li className={activeIf(location, '/')}>
                    <Link to="/"><i className="fa fa-tachometer fa-fw fa-2x"></i><label>Dashboard</label></Link>
                </li>
                <li className={activeIf(location, '/map')}>
                    <Link to="/map"><i className="fa fa-map fa-fw fa-2x"></i><label>Map</label></Link>
                </li>
                <li className={activeIf(location, '/graphs')}>
                    <Link to="/graphs"><i className="fa fa-area-chart fa-fw fa-2x"></i><label>Graphs</label></Link>
                </li>
                <li className={activeIf(location, '/gallery')}>
                    <Link to="/gallery"><i className="fa fa-camera fa-fw fa-2x"></i><label>Gallery</label></Link>
                </li>
                <li className={activeIf(location, '/terminal')}>
                    <Link to="/terminal"><i className="fa fa-terminal fa-fw fa-2x"></i><label>Terminal</label></Link>
                </li>
            </section>
            <section className="bottom">
                <li className={activeIf(location, '/settings')}>
                    <Link to="/settings"><i className="fa fa-cog fa-fw fa-2x"></i><label>Settings</label></Link>
                </li>
            </section>
        </ul>
    </div>
);

export default connect(store => ({
    location: store.routing.locationBeforeTransitions.pathname
}))(Sidebar);
