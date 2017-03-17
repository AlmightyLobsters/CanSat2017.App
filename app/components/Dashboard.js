import React from 'react';
import { connect } from 'react-redux';
import { addPacket } from '../helpers';

const ex_packet = '5,16.8,997,420,50,N,60,E,4,-55,3,2000,0.5,0,1,2,4,8,16,32,64';

const Dashboard = _ => (
    <div id="dashboard">
        <button onClick={e => addPacket(ex_packet)}>Generate</button>
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
