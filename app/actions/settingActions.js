import * as types from './settingActionTypes';

export const changeConnectAction = connected => ({
    type: types.CHANGE_CONNECT,
    payload: connected
});

export const portAction = port => ({
    type: types.ACTIVE_PORT,
    payload: port
});

export const changeAutoconnectAction = autoconnect => ({
    type: types.CHANGE_AUTOCONNECT,
    payload: autoconnect
});
