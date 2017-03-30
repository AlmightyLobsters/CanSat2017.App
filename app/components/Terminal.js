import React from 'react';
import { connect } from 'react-redux';

const Terminal = packets => (
    <div id="terminal">
        {packets}
    </div>
);

export default connect(store => ({
    packets: store.telemetry.packets
}))(Terminal);
