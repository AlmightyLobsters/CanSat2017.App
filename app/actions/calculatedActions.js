import * as types from './calculatedActionTypes';
import store from '../store';

export const addRelativeAltAction = altitude => ({
    type: types.ADD_RALT,
    payload: altitude - store.getState().calibration.alt
});

export const addFramedAccAction = (x, y, z) => ({
    type: types.ADD_FACC,
    payload: {
        x,
        y,
        z
    }
});

export const addGpsPressAction = pressure => ({
    type: types.ADD_GPRS,
    payload: pressure
});

export const updateEst = time => ({
    type: types.UPDATE_EST,
    payload: time
});

export const addWindVel = velocity => ({
    type: types.ADD_WVEL,
    payload: velocity
});

export const addCompassAction = direction => ({
    type: types.ADD_COMP,
    payload: direction
});
