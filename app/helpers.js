import axios from 'axios';
import * as telemetryActions from './actions/telemetryActions';
import * as settingsActions from './actions/settingActions';
import * as calculatedActions from './actions/calculatedActions';
import * as calibrationsActions from './actions/calibrationActions';
const actions = {...telemetryActions, ...settingsActions, ...calculatedActions, ...calibrationsActions};
import store from './store';
import SerialPort from 'serialport';
import { changeConnectAction, portAction } from './actions/settingActions';

export const addPacket = packet => {
    if (typeof packet !== 'string') throw new TypeError('Packet must be of type string');
    let serverUrl = store.getState().settings.serverUrl;
    while(serverUrl[serverUrl.length - 1] === '/')
        serverUrl = serverUrl.substring(0, serverUrl.length - 1);
    axios.post(serverUrl + '/api/data/upload', {
        data: packet
    });
    const [TIME,TEMPERATURE,PRESSURE,HUMIDITY,LATITUDE,LATITUDE_ORIENTATION,LONGITUDE,LONGITUDE_ORIENTATION,ALTITUDE,RSSI,BATTERY_VOLTAGE,VELOCITY,X_ACCELERATION,Y_ACCELERATION,Z_ACCELERATION,X_ROTATION,Y_ROTATION,Z_ROTATION,X_MAGNETIC_FIELD,Y_MAGNETIC_FIELD,Z_MAGNETIC_FIELD] = packet.split(',');
    /* telemetry */
    store.dispatch(actions.addTimeAction(new Date()));
    store.dispatch(actions.addPrimAction(TEMPERATURE/100, PRESSURE/10, HUMIDITY/100));
    store.dispatch(actions.addGpsAction(LATITUDE, LATITUDE_ORIENTATION, LONGITUDE, LONGITUDE_ORIENTATION, ALTITUDE));
    store.dispatch(actions.addStatsAction(RSSI, getBatteryLvl(BATTERY_VOLTAGE)));
    store.dispatch(actions.addAccAction(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION));
    store.dispatch(actions.addRotAction(X_ROTATION, Y_ROTATION, Z_ROTATION));
    store.dispatch(actions.addMagAction(X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD));
    store.dispatch(actions.addVelAction(
        calculateAccVelocity(X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION, X_ROTATION, Y_ROTATION, Z_ROTATION, store.getState().telemetry.vel.accs),
        calculateAltVelocity(ALTITUDE, store.getState().telemetry.gps.altts.slice(-1), TIME, store.getState().telemetry.times.slice(-1)),
        VELOCITY
    ));
    if (store.getState().settings.connected) store.dispatch(actions.addPacketAction(packet));

    /*derivations */
    const relAlt = altitudePressure(PRESSURE);
    const framedAcc = frameAcceleration([X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION], [X_ROTATION, Y_ROTATION, Z_ROTATION], [X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD]);
    store.dispatch(actions.addRelativeAltAction(relAlt));
    store.dispatch(actions.addFramedAccAction(framedAcc));
    store.dispatch(actions.addGpsPressAction(pressureAltitude(ALTITUDE)));
    store.dispatch(actions.updateEst(estimateLanding(relAlt, VELOCITY)));
    store.dispatch(actions.addWindVel(framedAcc[0], framedAcc[1]));
    store.dispatch(actions.addCompassAction(getAngle([Number(X_MAGNETIC_FIELD),Number(Y_MAGNETIC_FIELD),Number(Z_MAGNETIC_FIELD)], [1,0,0])));

    // store.dispatch(actions.setPresAction(CAL_PRESS));
};

export const calibrate = packet => {
    if (typeof packet !== 'string') throw new TypeError('Packet must be of type string');
    const [TIME, TEMPERATURE, PRESSURE, HUMIDITY, LATITUDE, LATITUDE_ORIENTATION, LONGITUDE, LONGITUDE_ORIENTATION, ALTITUDE, RSSI, BATTERY_VOLTAGE, VELOCITY, X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION, X_ROTATION, Y_ROTATION, Z_ROTATION, X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD] = packet.split(',');

    store.dispatch(actions.setTimeAction(TIME));
    store.dispatch(actions.setTempAction(TEMPERATURE));
    store.dispatch(actions.setPresAction(PRESSURE));
    store.dispatch(actions.setAltAction(ALTITUDE));
    store.dispatch(actions.setHmdtAction(HUMIDITY));
    store.dispatch(actions.setGPSAction([LATITUDE, LONGITUDE, ALTITUDE]));
    store.dispatch(actions.setAccAction([X_ACCELERATION, Y_ACCELERATION, Z_ACCELERATION]));
    store.dispatch(actions.setRotAction([X_ROTATION, Y_ROTATION, Z_ROTATION]));
    store.dispatch(actions.setMagaction([X_MAGNETIC_FIELD, Y_MAGNETIC_FIELD, Z_MAGNETIC_FIELD]));
    store.dispatch(actions.setBatlvlAction(getBatteryLvl(BATTERY_VOLTAGE)));
};


/* frame it nice */
export const frameAcceleration = (acceleration, rotation, magfield) => {
    if (acceleration.length !== rotation.length) throw new Error('The dimension of acceleration does not correspond to the one of rotation');
    // probe's frame of reference: (X, Y, Z); earth's frame: (V, H1, H2)
    let V = acceleration;
    let H1 = magfield;
    let H2 = crossProduct(V, H1);
    H1 = crossProduct(V, H2);

    normalize(H1);
    normalize(H2);

    return matMult([V, H1, H2], rotation);
};


/* obscure math */
const getAngle = (v1, v2) => {
    let dp = dotProduct(normalize(v1), normalize(v2));
    v1 = vectorLength(v1);
    v2 = vectorLength(v2);
    let b = dp/(v1 * v2);
    let res = Math.acos(b);
    return res;
}

export const getSide = (angle) => {
    if (angle >= 315 || angle < 45) return 'N';
    else if (angle >= 45 && angle < 135) return 'E';
    else if (angle >= 135 && angle < 225) return 'S';
    else if (angle >= 225 && angle < 315) return 'W';
    else return 'FU';
};

const dotProduct = (v1, v2) => {
    let v3 = 0;
    for (let i = 0; i < v1.length; i++) {
        v3 += (v1[i] * v2[i]);
    }
    return v3;
};

const matMult = (a, b) => {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
};

const addVectors = (v1, v2) => {
    let v3 = [];
    for (let i = 0; i < v1.length; i++) {
        v3.push(v1[i] + v2[i]);
    }
    return v3;
};

const normalize = v => v.map(e => e / vectorLength(v));

const vectorLength = v => Math.sqrt(v.reduce((acc, val) => acc + (val ** 2) , 0));

const randomVector = d => {
    let arr = [];
    for (let i = 0; i < d; d++) arr[i] = Math.random();
    return arr;
};

const flatten = arr => [].concat.apply([], arr);

const crossProduct = (...sets) =>
    //TODO: fix
    sets.reduce((acc, set) =>
        flatten(acc.map(x => set.map(y => [...x, y]))),
        [[]]);


/* Velocity calculation */
export const getVelocity = (distance, time) => distance / (time||1);

export const calculateAltVelocity = (cAlt, lAlt, cTime, lTime) => {
    let dist = Math.abs(cAlt - lAlt);
    let time = Math.abs(cTime - lTime);
    return getVelocity(dist, time);
};

export const calculateAccVelocity = (accY, prevVel) => {
    //TODO: Part two of Max's magic
    return prevVel + accY; // this will be so off track if don't do some mean thing to it
};


/* Barometric constants and functions */
const P0 = 1013.25;
const feet = 0.3084;
const T0 = 288.15;
const g = 9.80665;
const M = 0.0289644;
const R0 = 8.31447;

export const altitudePressure = pressure => (1 - (pressure / (P0 * 10)) ** 0.190284) * 145366.45 * feet;

export const pressureAltitude = altitude => P0 * Math.exp(- g * M * altitude / R0 * T0);


/* Obscure functions */
export const estimateLanding = (altitude, velocity) => altitude / velocity;

export const getBatteryLvl = (voltage) => voltage;


/* Packet management */
export const bufferToPacket = buffer => {
    if(typeof buffer !== 'object' || !Buffer.isBuffer(buffer)) throw new TypeError('Buffer has to be of type buffer');
    return  `${buffer.readFloatLE(8)},`+ // time
            `${buffer.readInt16LE(2)},`+ // temp
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
            // `${buffer.readFloatLE(52)}`; // colPress
};

export const requireNumber = (value, name) => { if ((!value && value !== 0) || isNaN(value)) throw new TypeError(`${name} (${value}) must be convertable to a number`); };
export const requireBelongs = (value = '', str = '', name) => { if (!value || str.toUpperCase().indexOf(value.toUpperCase()) === -1) throw new TypeError(`${name} (${value}) must belong to ` + str.split('').join('|')); };


/* Weather forecast */
export const getWeatherState = (cur, sup) => Math.sign(cur-sup);

export const getWindVelocity = (x, y) => vectorLength(addVectors(x, y));


/* Serial connection */
const serialConnect = ports => {
    if (ports.length === 1) {
        let port = new SerialPort(ports[0].comName, {
            baudrate: 9600,
            parser: SerialPort.parsers.raw
        });
        if (port) store.dispatch(changeConnectAction(true));
        else throw new Error('Serial connection was not established');
        return port;
    }
    else {
        //reconnect();
    }
};

const reconnect = () => {
    alert('Please connect exactly one device and hit enter');
    serialCommunicate(true);
};

export const serialCommunicate = force => {
    SerialPort.list((err, ports) => {
        if (err) throw err;
        if (store.getState().settings.autoconnect || force) {
            serialConnect(ports).on('data', (data) => {
                let packet = bufferToPacket(data);
                addPacket(packet);
            }).on('error', err => {
                store.dispatch(changeConnectAction(false));
                throw err;
            }).on('disconnect', () => {
                store.dispatch(changeConnectAction(false));
                reconnect();
            });
        }
        else {
            store.dispatch(changeConnectAction(false));
            reconnect();
        }
        store.dispatch(portAction(ports));
    });
};
