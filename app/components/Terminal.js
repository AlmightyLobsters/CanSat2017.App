import React from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import { join } from 'path';
import store from '../store';

const exportData = (e) => {
    fs.writeFile(join('C:\\Users\\Adalbert\\Desktop', 'CanSat2017Output.csv'),
        'TIME,TEMPERATURE,PRESSURE,HUMIDITY,LATITUDE,LATITUDE_ORIENTATION,LONGITUDE,LONGITUDE_ORIENTATION,ALTITUDE,RSSI,BATTERY_VOLTAGE,VELOCITY,X_ACCELERATION,Y_ACCELERATION,Z_ACCELERATION,X_ROTATION,Y_ROTATION,Z_ROTATION,X_MAGNETIC_FIELD,Y_MAGNETIC_FIELD,Z_MAGNETIC_FIELD\n' +
        store.getState().telemetry.packets.join('\r\n'),
        err => {
            if (err) throw err;
            console.log('Written');
        });
};

const Terminal = ({packets}) => (
    <div id="terminal">
        <button onClick={exportData.bind(this)}>Export</button>
        <div id="raw">
            {packets.map((packet, index) => <p key={index}>{packet}</p>)}
        </div>
    </div>
);

Terminal.componentDidMount = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

export default connect(store => ({
    packets: store.telemetry.packets
}))(Terminal);
