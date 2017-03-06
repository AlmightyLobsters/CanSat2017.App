import React from 'react';
import { connect } from 'react-redux';

const Dashboard = _ => (
    <div id="dashboard">
        <section className="AltWrapper">
            <div className="Altitude">
                <h1 id="RelativeAltitude">467m</h1>
                <h2 id="Estimate">landing in 37s</h2>
            </div>
        </section>
    </div>
);

export default connect(store => ({

}))(Dashboard);