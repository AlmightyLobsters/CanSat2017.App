import * as types from './settingActionTypes';

export const changeConnectAction = connected => ({
    type: types.CHANGE_CONNECT,
    payload: connected
});

export const portAction = list => ({
    type: types.ADD_COM,
    payload: list.map(e => e.comName)
});

export const changeAutoconnectAction = autoconnect => ({
    type: types.CHANGE_AUTOCONNECT,
    payload: autoconnect
});

export const changeServerUrl = serverUrl => ({
    type: types.CHANGE_SERVER_URL,
    payload: serverUrl
});
