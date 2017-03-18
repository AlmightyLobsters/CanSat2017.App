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

export const bufferToPacket = buffer => {
    if(typeof buffer !== 'object' || !Buffer.isBuffer(buffer)) throw new TypeError('Buffer has to be of type buffer');
    return  `${buffer.readFloatLE(6)},`+ // time
            `${buffer.readUInt16LE(0)},`+ // temp
            `${buffer.readUInt16LE(2)},`+ // pres
            `${buffer.readUInt16LE(4)},`+ // hmdt
            `${buffer.readFloatLE(10)},`+ // lat
            `${buffer.readUInt8(14) ? 'S' : 'N'},`+ // lato
            `${buffer.readFloatLE(15)},`+ // lon
            `${buffer.readUInt8(19) ? 'E' : 'W'},`+ // lono
            `${buffer.readFloatLE(20)},`+ // alt
            `${buffer.readInt16LE(50)},`+ // rssi
            `${buffer.readFloatLE(24)},`+ // btlvl
            `${buffer.readFloatLE(28)},`+ // prop
            `${buffer.readInt16LE(32)},`+ // xacc
            `${buffer.readInt16LE(34)},`+ // yacc
            `${buffer.readInt16LE(36)},`+ // zacc
            `${buffer.readInt16LE(38)},`+ // xrot
            `${buffer.readInt16LE(40)},`+ // yrot
            `${buffer.readInt16LE(42)},`+ // zrot
            `${buffer.readInt16LE(44)},`+ // xmag
            `${buffer.readInt16LE(46)},`+ // ymag
            `${buffer.readInt16LE(48)}`; // zmag
};
