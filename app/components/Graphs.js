import React from 'react';
import { connect } from 'react-redux';
import C3Chart from 'react-c3js';

const standardPadding = {
    left: 48,
    right: 48,
    top: 48
};

const Graphs = ({ telemetry }) => (
    <div id="graphs">
        <h1>Graphs</h1>
        <C3Chart className="temps col-1-1" data={{ json: { Temperature: telemetry.primary.temps } }} padding={standardPadding} color={{ pattern: ['blue'] }} />
        <C3Chart className="press col-1-2" data={{ json: { Pressure: telemetry.primary.press } }} padding={standardPadding} color={{ pattern: ['red'] }} />
        <C3Chart className="hmdts col-1-2" data={{ json: { Humidity: telemetry.primary.hmdts } }} padding={standardPadding} color={{ pattern: ['green'] }} />
    </div>
);

export default connect(store => ({
    telemetry: store.telemetry
}))(Graphs);
