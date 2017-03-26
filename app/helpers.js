import * as actions from './actions/telemetryActions';
import store from './store';
import SerialPort from 'serialport';
import { changeConnectAction } from './actions/settingActions';

export const addPacket = packet => {
    if (typeof packet !== 'string') throw new TypeError('Packet must be of type string');
    const [TIME,TEMPERATURE,PRESSURE,HUMIDITY,LATITUDE,LATITUDE_ORIENTATION,LONGITUDE,LONGITUDE_ORIENTATION,ALTITUDE,RSSI,BATTERY_LEVEL,VELOCITY,X_ACCELERATION,Y_ACCELERATION,Z_ACCELERATION,X_ROTATION,Y_ROTATION,Z_ROTATION,X_MAGNETIC_FIELD,Y_MAGNETIC_FIELD,Z_MAGNETIC_FIELD] = packet.split(',');
    store.dispatch(actions.addVelAction(calculateAccVelocity(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION, X_ROTATION, Y_ROTATION, Z_ROTATION, store.getState().telemetry.vel.accs), calculateAltVelocity(ALTITUDE, store.getState().telemetry.gps.altts), VELOCITY));
    store.dispatch(actions.addTimeAction(TIME));
    store.dispatch(actions.addPrimAction(TEMPERATURE, PRESSURE, HUMIDITY));
    store.dispatch(actions.addGpsAction(LATITUDE, LATITUDE_ORIENTATION, LONGITUDE, LONGITUDE_ORIENTATION, ALTITUDE));
    store.dispatch(actions.addStatsAction(RSSI, BATTERY_LEVEL));
    store.dispatch(actions.addAccAction(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION));
    store.dispatch(actions.addRotAction(X_ROTATION, Y_ROTATION, Z_ROTATION));
    store.dispatch(actions.addMagAction(X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD));
};

export const frameAcceleration = (acceleration, rotation) => {
    if(acceleration.length !== rotation.length) throw new Error('The dimension of acceleration does not correspond to the one of rotation');
    //TODO: Max's magic
};

export const calculateAccVelocity = (accY, prevVel) => {
    //TODO: Part two of Max's magic
    return prevVel + accY; // this will be so off track if don't do some mean thing to it
};

//TODO: Proper algorithm
export const calculateAltVelocity = (altitude, altitudes) => altitude - (altitudes[altitudes.length - 1] || 111);

// //TODO: Make space for eventual packet loss where the time interval would not be 1s
// export const calculatePressVelocity = (pressure, pressures) => {
//     let standardPressure = 1013.25;
//     //TODO: Substitute magic numbers for named constants
//     const altFromPresNow = (1 - (pressure / standardPressure) ** 0.190284) * 145366.45 * 0.3048;
//     const altFromPresBefore = (1 - ((pressures[pressures.length - 1] || 1000) / standardPressure) ** 0.190284) * 145366.45 * 0.3048;
//     return altFromPresNow - altFromPresBefore;
// };

export const bufferToPacket = buffer => {
    if(typeof buffer !== 'object' || !Buffer.isBuffer(buffer)) throw new TypeError('Buffer has to be of type buffer');
    return  `${buffer.readFloatLE(8)},`+ // time
            `${buffer.readUInt16LE(2)},`+ // temp
            `${buffer.readUInt16LE(4)},`+ // pres
            `${buffer.readUInt16LE(6)},`+ // hmdt
            `${buffer.readFloatLE(12)},`+ // lat
            `${buffer.readUInt8(0) ? 'S' : 'N'},`+ // lato
            `${buffer.readFloatLE(16)},`+ // lon
            `${buffer.readUInt8(1) ? 'E' : 'W'},`+ // lono
            `${buffer.readFloatLE(20)},`+ // alt
            `${buffer.readInt8(50)},`+ // rssi
            `${buffer.readFloatLE(24)},`+ // btlvl
            `${buffer.readFloatLE(28)},`+ // vel
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

export const serialConnect = (com, baudrate) => {
    let port = new SerialPort(com, {
        baudrate,
        parser: SerialPort.parsers.raw
    });
    if (port) store.dispatch(changeConnectAction(true));
    else throw new Error('Serial connection was not established');
    return port;
};
