import * as actions from './actions/telemetryActions';
import store from './store';

export const addPacket = packet => {
    if (typeof packet !== 'string') throw new TypeError('Packet must be of type string');
    const [TIME,TEMPERATURE,PRESSURE,HUMIDITY,LATITUDE,LATITUDE_ORIENTATION,LONGITUDE,LONGITUDE_ORIENTATION,ALTITUDE,RSSI,BATTERY_LEVEL,PROPELLER_ROTATION,X_ACCELERATION,Y_ACCELERATION,Z_ACCELERATION,X_ROTATION,Y_ROTATION,Z_ROTATION,X_MAGNETIC_FIELD,Y_MAGNETIC_FIELD,Z_MAGNETIC_FIELD] = packet.split(',');
    store.dispatch(actions.addVelAction(calculateAccVelocity(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION, X_ROTATION, Y_ROTATION, Z_ROTATION, store.getState().telemetry.vel.accs), calculateAltVelocity(ALTITUDE, store.getState().telemetry.gps.altts), calculatePressVelocity(PRESSURE, store.getState().telemetry.primary.press)));
    store.dispatch(actions.addTimeAction(TIME));
    store.dispatch(actions.addPrimAction(TEMPERATURE, PRESSURE, HUMIDITY));
    store.dispatch(actions.addGpsAction(LATITUDE, LATITUDE_ORIENTATION, LONGITUDE, LONGITUDE_ORIENTATION, ALTITUDE));
    store.dispatch(actions.addStatsAction(RSSI, BATTERY_LEVEL, PROPELLER_ROTATION));
    store.dispatch(actions.addAccAction(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION));
    store.dispatch(actions.addRotAction(X_ROTATION, Y_ROTATION, Z_ROTATION));
    store.dispatch(actions.addMagAction(X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD));
};

export const calculateAccVelocity = (accX, accY, accZ, rotX, rotY, rotZ, prevVel) => {
    //TODO: Max's magic
    return 1;
};

//TODO: Proper algorithm
export const calculateAltVelocity = (altitude, altitudes) => altitude - (altitudes[altitudes.length - 1] || 111);

//TODO: Proper algorithm
export const calculatePressVelocity = (pressure, pressures) => {
    const altFromPresNow = (1 - (pressure / 1013.25) ** 0.190284) * 145366.45 * 0.3048;
    const altFromPresBefore = (1 - ((pressures[pressures.length - 1] || 1000) / 1013.25) ** 0.190284) * 145366.45 * 0.3048;
    return altFromPresNow - altFromPresBefore;
};
