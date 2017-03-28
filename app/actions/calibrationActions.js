import * as types from './calibrationActionTypes';

export const setTimeAction = time => ({
    type: types.SET_TIME,
    payload: time
});

export const setTempAction = temp => ({
    type: types.SET_TEMP,
    payload: temp
});

export const setPresAction = pres => ({
    type: types.SET_PRES,
    payload: pres
});

export const setAltAction = alt => ({
    type: types.SET_ALT,
    payload: alt
});

export const setHmdtAction = hmdt => ({
    type: types.HMDT,
    payload: hmdt
});

export const setGPSAction = gps => ({
    type: types.GPS,
    payload: gps
});

export const setAccAction = acc => ({
    type: types.SET_ACC,
    payload: acc
});

export const setMagAction = mag => ({
    type: types.SET_MAG,
    payload: mag
});

export const setRotAction = rot => ({
    type: types.SET_ROT,
    payload: rot
});

export const setBatlvlAction = batlvl => ({
    type: types.SET_BATLVL,
    payload: batlvl
});
