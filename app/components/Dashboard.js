import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

// TODO: finish
const relAltitude = (calibrationAltitude, currentAltitude) => {
    return currentAltitude - calibrationAltitude;
};

// TODO: add compas direction calculation
const direction = mag => {
    return 0;
};

// TODO: add landing estimate colculation
const estimate = (relAltitude, velocity) => {
    return relAltitude / velocity;
};

const Dashboard = ({ connected, telemetry }) => (
    <div id="dashboard">
        <section className="AltWrapper">
            <div className="Altitude">
                <h1 id="RelativeAltitude">{ relAltitude }</h1>
                <h2 id="Estimate">landing in { estimate }</h2>
            </div>
        </section>

        <section className="values">
            <div id="left">
                <ul>
                    <li>{telemetry.gps.altts.slice(-1)}</li>
                    <li>{telemetry.vel.press.slice(-1)}</li>
                    <li>{telemetry.stats.batlvls.slice(-1)}</li>
                    <li>{telemetry.acc.xs.slice(-1)}, {telemetry.acc.ys.slice(-1)}, {telemetry.acc.zs.slice(-1)}</li>
                    <li>{direction}</li>
                </ul>
            </div>
            <div id="right">
                <ul>
                    <li>{telemetry.gps.latts.slice(-1)}, {telemetry.gps.longs.slice(-1)}</li>
                    <li>{telemetry.stats.rssis.slice(-1)}</li>
                    <li>{telemetry.primary.temps.slice(-1)}</li>
                    <li>{telemetry.primary.press.slice(-1)}</li>
                    <li>{telemetry.primary.hmdts.slice(-1)}</li>
                </ul>
            </div>
        </section>
    </div>
);

export default connect(store => ({
    connected: store.connected,
    telemetry: store.telemetry
}))(Dashboard);
