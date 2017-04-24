import React from 'react';
import { connect } from 'react-redux';
import C3Chart from 'react-c3js';

const standardPadding = {
    left: 48,
    right: 48,
    top: 48
};

const Graphs = ({ telemetry, derived }) => (
    <div id="graphs">
        <h1 style={{marginLeft: '12px'}}>Graphs</h1>
        <C3Chart
            className="temps col-1-1"
            data={{ json: { Temperature: telemetry.primary.temps }, type: 'line' }}
            padding={standardPadding}
            color={{ pattern: ['blue'] }}
            axis={{ x: { tick: { count: telemetry.times.length / 10 } } }} />
        <C3Chart
            className="press col-1-2"
            data={{ json: { Pressure: telemetry.primary.press }, type: 'line' }}
            padding={standardPadding}
            color={{ pattern: ['red'] }}
            axis={{ x: { tick: { count: telemetry.times.length / 10 } } }} />
        <C3Chart
            className="hmdts col-1-2"
            data={{ json: { Humidity: telemetry.primary.hmdts }, type: 'line' }}
            padding={standardPadding}
            color={{ pattern: ['green'] }}
            axis={{ x: { tick: { count: telemetry.times.length / 10 } } }} />
        <C3Chart
            className="relAlt col-1-1"
            data={{ json: { 'Relative Altitude': derived.relAlts }, type: 'line' }}
            padding={standardPadding}
            color={{ pattern: ['orange'] }}
            axis={{ x: { tick: { count: telemetry.times.length / 10 } } }} />
    </div>
);

export default connect(store => ({
    telemetry: store.telemetry,
    derived: store.calculatedValues
}))(Graphs);
