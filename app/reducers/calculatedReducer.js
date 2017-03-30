import { combineReducers } from 'redux';
import * as types from '../actions/calculatedActionTypes';
import { requireNumber } from '../helpers';

const raltReducer = (state = [], action) => {
    if (action && action.type === types.ADD_RALT) {
        const alt = action.payload;
        requireNumber(alt, 'Relative Altitude');
        return state.concat([Number(alt)]);
    };
    return state;
};

const faccReducer = (state = {xs: [], ys: [], zs: []}, action) => {
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

const gpressReducer = (state = [], action) => {
    if (action && action.type === types.ADD_GPRS) {
        const pres = action.payload;
        requireNumber(pres, 'GPS Pressure');
        return state.concat([Number(pres)]);
    }
    return state;
};

const wvelReducer = (state = [], action) => {
    if (action && action.type === types.ADD_WVEL) {
        const vel = action.payload;
        requireNumber(vel, 'Wind Velocity');
        return state.concat([Number(vel)]);
    }
    return state;
};

const estReducer = (state = 0, action) => {
    if (action && action.type === types.UPDATE_EST) {
        return action.payload;
    }
    return state;
};

const compReducer = (state = [], action) => {
    if (action && action.type === types.ADD_COMP) {
        const dir = action.payload;
        requireNumber(dir, 'Direction');
        return state.concat([Number(dir)]);
    }
    return state;
};

export default combineReducers({
    relAlts: raltReducer,
    framedAccs: faccReducer,
    gpsPress: gpressReducer,
    wvel: wvelReducer,
    est: estReducer,
    compass: compReducer
});
