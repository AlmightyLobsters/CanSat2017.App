import { combineReducers } from 'redux';
import * as types from '../actions/telemetryActionTypes';
import { requireBelongs, requireNumber } from '../helpers';

const timeReducer = (state = [], action) => {
    if (action && action.type === types.ADD_TIME) {
        const time = action.payload;
        requireNumber(time, 'Time');
        return state.concat([Number(time)]);
    }
    return state;
};

const primReducer = (state = {temps: [], press: [], hmdts: []}, action) => {
    if (action && action.type === types.ADD_PRIM) {
        const { temperature, pressure, humidity } = action.payload;
        requireNumber(temperature, 'Temperature');
        requireNumber(pressure, 'Pressure');
        requireNumber(humidity, 'Humidity');
        return {
            temps: state.temps.concat([Number(temperature)]),
            press: state.press.concat([Number(pressure)]),
            hmdts: state.hmdts.concat([Number(humidity)])
        };
    }
    return state;
};

const gpsReducer = (state = {latts: [], latts_o: [], longs: [], longs_o: [], altts: []}, action) => {
    if (action && action.type === types.ADD_GPS) {
        const {
            latitude: { value: latVal, orientation: latOr },
            longitude: { value: longVal, orientation: longOr },
            altitude: altVal
        } = action.payload;
        requireNumber(latVal, 'Latitude value');
        requireBelongs(latOr, 'NS', 'Latitude orientation');
        requireNumber(longVal, 'Longitude value');
        requireBelongs(longOr, 'WE', 'Longitude orientation');
        requireNumber(altVal);
        return {
            latts: state.latts.concat([Number(latVal)]),
            latts_o: state.latts_o.concat([latOr]),
            longs: state.longs.concat([Number(longVal)]),
            longs_o: state.longs_o.concat([longOr]),
            altts: state.altts.concat([Number(altVal)])
        };
    }
    return state;
};

const statsReducer = (state = {rssis: [], batlvls: []}, action) => {
    if (action && action.type === types.ADD_STATS) {
        const { rssi, batteryLevel } = action.payload;
        requireNumber(rssi, 'RSSI');
        requireNumber(batteryLevel);
        return {
            rssis: state.rssis.concat([Number(rssi)]),
            batlvls: state.batlvls.concat([Number(batteryLevel)]),
        };
    }
    return state;
};

const accReducer = (state = {xs: [], ys: [], zs: []}, action) => {
    if (action && action.type === types.ADD_ACC) {
        const { x, y, z } = action.payload;
        requireNumber(x, 'X Acceleration');
        requireNumber(y, 'Y Acceleration');
        requireNumber(z, 'Z Acceleration');
        return {
            xs: state.xs.concat([Number(x)]),
            ys: state.ys.concat([Number(y)]),
            zs: state.zs.concat([Number(z)])
        };
    }
    return state;
};

const rotReducer = (state = {xs: [], ys: [], zs: []}, action) => {
    if (action && action.type === types.ADD_ROT) {
        const { x, y, z } = action.payload;
        requireNumber(x, 'X Rotation');
        requireNumber(y, 'Y Rotation');
        requireNumber(z, 'Z Rotation');
        return {
            xs: state.xs.concat([Number(x)]),
            ys: state.ys.concat([Number(y)]),
            zs: state.zs.concat([Number(z)])
        };
    }
    return state;
};

const magReducer = (state = {xs: [], ys: [], zs: []}, action) => {
    if (action && action.type === types.ADD_MAG) {
        const { x, y, z } = action.payload;
        requireNumber(x, 'X Magnetic field');
        requireNumber(y, 'Y Magnetic field');
        requireNumber(z, 'Z Magnetic field');
        return {
            xs: state.xs.concat([Number(x)]),
            ys: state.ys.concat([Number(y)]),
            zs: state.zs.concat([Number(z)])
        };
    }
    return state;
};

const velReducer = (state = {accs: [], altts: [], press: []}, action) => {
    if (action && action.type === types.ADD_VEL) {
        const { accelerationVelocity, altitudeVelocity, pressureVelocity } = action.payload;
        requireNumber(accelerationVelocity, 'Acceleration derived velocity');
        requireNumber(altitudeVelocity, 'Altitude derived velocity');
        requireNumber(pressureVelocity, 'Pressure derived velocity');
        return {
            accs: state.accs.concat([Number(accelerationVelocity)]),
            altts: state.altts.concat([Number(altitudeVelocity)]),
            press: state.press.concat([Number(pressureVelocity)])
        };
    }
    return state;
};

const packetReducer = (state = [], action) => {
    if (action && action.type === types.ADD_PACKET) {
        return state.concat([action.payload]);
    }
    return state;
};

export default combineReducers({
    times: timeReducer,
    primary: primReducer,
    gps: gpsReducer,
    stats: statsReducer,
    acc: accReducer,
    rot: rotReducer,
    mag: magReducer,
    vel: velReducer,
    packets: packetReducer
});
