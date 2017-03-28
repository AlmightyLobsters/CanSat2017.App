import { combineReducers } from 'redux';
import * as types from '../actions/calibrationActionTypes';

const setTimeReducer = (state = 0, action) => {
    if (action && action.type === types.SET_TIME) {
        return action.payload;
    }
    return state;
};

const setTempReducer = (state = 0, action) => {
    if (action && action.type === types.SET_TEMP) {
        return action.payload;
    }
    return state;
};

const setPresReducer = (state = 0, action) => {
    if (action && action.type === types.SET_PRES) {
        return action.payload;
    }
    return state;
};

const setAltReducer = (state = 0, action) => {
    if (action && action.type === types.SET_ALT) {
        return action.payload;
    }
    return state;
};

const setHmdtReducer = (state = 0, action) => {
    if (action && action.type === types.SET_HMDT) {
        return action.payload;
    }
    return state;
};

const setGpsReducer = (state = [], action) => {
    if (action && action.type === types.SET_GPS) {
        return action.payload;
    }
    return state;
};

const setAccReducer = (state = [], action) => {
    if (action && action.type === types.SET_ACC) {
        return action.payload;
    }
    return state;
};

const setMagReducer = (state = [], action) => {
    if (action && action.type === types.SET_MAG) {
        return action.payload;
    }
    return state;
};

const setRotReducer = (state = [], action) => {
    if (action && action.type === types.SET_ROT) {
        return action.payload;
    }
    return state;
};

const setBatlvlReducer = (state = 0, action) => {
    if (action && action.type === types.SET_BATLVL) {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    time: setTimeReducer,
    temp: setTempReducer,
    pres: setPresReducer,
    alt: setAltReducer,
    hmdt: setHmdtReducer,
    gps: setGpsReducer,
    acc: setAccReducer,
    mag: setMagReducer,
    rot: setRotReducer,
    batlvl: setBatlvlReducer
});
