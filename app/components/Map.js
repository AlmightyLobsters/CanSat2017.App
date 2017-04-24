import React from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const toDegrees = tude => {
    let wholeDegrees = Math.floor(tude / 100);
    let decimalDegrees = (tude - wholeDegrees * 100) / 60;
    return wholeDegrees + decimalDegrees;
};

const Map = ({beginLat, beginLon, probeLat, probeLon}) => (
    <div id="maps">
        <h1 style={{marginLeft: '12px'}}>Maps</h1>
        {/* <p style={{fontSize: '7em'}}>Coming soon...</p>*/}
        <LeafletMap
            style={{ height: '80%', marginLeft: '52px', marginRight: '52px' }}
            center={[
                toDegrees(beginLat),
                toDegrees(beginLon)
            ]}
            zoom={15}>
            <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            <Marker position={[
                toDegrees(probeLat),
                toDegrees(probeLon)
            ]}>
                <Popup>
                    <span>Probe Location</span>
                </Popup>
            </Marker>
        </LeafletMap>
    </div>
);

export default connect(store => ({
    beginLat: store.telemetry.gps.latts[0],
    beginLon: store.telemetry.gps.longs[0],
    probeLat: store.telemetry.gps.latts[store.telemetry.gps.latts.length - 1],
    probeLon: store.telemetry.gps.longs[store.telemetry.gps.longs.length - 1],
}))(Map);
