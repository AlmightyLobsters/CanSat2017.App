import React from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const OwnGoogleMap = withGoogleMap(({ zoom = 3, centerLat, centerLng, latitude, longitude }) => (
    <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{lat: centerLat, lng: centerLng}}>
        <Marker position={{lat: latitude, lng: longitude}} />
    </GoogleMap>
));

const Map = ({beginLat, beginLon, probeLat, probeLon}) => (
    <div id="maps">
        <h1>Maps</h1>
        <p style={{fontSize: '7em'}}>Coming soon...</p>
    </div>
);

// <OwnGoogleMap zoom={15}
//             containerElement={
//                 <div style={{ height: '100%' }} />
//             }
//             mapElement={
//                 <div style={{ height: '100%' }} />
//             }
//             centerLat={beginLat}
//             centerLng={beginLon}
//             latitude={probeLat}
//             longitude={probeLon} />

export default connect(store => ({
    beginLat: store.telemetry.gps.latts[0],
    beginLon: store.telemetry.gps.longs[0],
    probeLat: store.telemetry.gps.latts[store.telemetry.gps.latts.length - 1],
    probeLon: store.telemetry.gps.longs[store.telemetry.gps.longs.length - 1]
}))(Map);
