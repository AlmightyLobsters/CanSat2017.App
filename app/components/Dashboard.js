import React from 'react';

export const Dashboard = _ => (
    <div id="Dashboard">
        <div className="AltWrapper">
            <div className="Altitude">
                <h1 id="RelativeAltitude">347</h1>
                <h1 id="Estimate">landing in 48s</h1>
            </div>
        </div>
        <section className="Values">
            <div className="Values-Left">
                <ul>
                    <li id="AbsoluteAltitude"></li>
                    <li id="Velocity"></li>
                    <li id="Battery"></li>
                    <li id="Acceleration"></li>
                    <li id="RoterSpeed"></li>
                </ul>
            </div>
            <div className="Values-Right">
                <ul>
                    <li id="GPS"></li>
                    <li id="Signal"></li>
                    <li id="Temperature"></li>
                    <li id="Pressure"></li>
                </ul>
            </div>
        </section>
    </div>
);
