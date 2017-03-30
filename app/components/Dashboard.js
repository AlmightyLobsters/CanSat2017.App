import React from 'react';
import { connect } from 'react-redux';
import { getSide } from '../helpers';

const Dashboard = ({ connected, telemetry, derived }) => (
    <div id="dashboard">
        <section className="AltWrapper">
            <div className="Altitude">
                <h1 id="RelativeAltitude">{ derived.relAlts.slice(-1) }</h1>
                <h2 id="Estimate">landing in { derived.est }</h2>
            </div>
        </section>

        <section className="values">
            <div id="left">
                <p>The probe <b>is</b> {telemetry.gps.altts.slice(-1)}m a.s.l.,
                <b>falling</b> at a rate of {telemetry.vel.press.slice(-1)}m/s,
                <b>Heading</b> {derived.wvel.slice(-1)}m/s
                in the general <b>direction</b> of {getSide(derived.compass.slice(-1))} ({derived.compass.slice(-1)}).
                Currently <b>located</b> at {telemetry.gps.latts.slice(-1)}{telemetry.gps.latts_o.slice(-1)}, {telemetry.gps.longs.slice(-1)}{telemetry.gps.longs_o.slice(-1)}</p>
            </div>
            <div id="right">
                <p>The strength of <b>signal</b> is {telemetry.stats.rssis.slice(-1)}db.
                <b>Temperature</b> is {telemetry.primary.temps.slice(-1)}°C,
                <b>Atmospheric</b> pressure {telemetry.primary.press.slice(-1)}mbar
                and <b>Humidity</b> {telemetry.primary.hmdts.slice(-1)}%.</p>
            </div>
        </section>
    </div>
);

export default connect(store => ({
    connected: store.connected,
    telemetry: store.telemetry,
    derived: store.calculatedValues
}))(Dashboard);
