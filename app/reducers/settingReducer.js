import { combineReducers } from 'redux';
import * as types from '../actions/settingActionTypes';

const changeConnectReducer = (state = null, action) => {
    if(action && action.type === types.CHANGE_CONNECT) {
        return action.payload;
    }
    return state;
};

const portReducer = (state = '', action) => {
    if(action && action.type === types.ADD_COM) {
        return action.payload;
    }
    return state;
};

const changeAutoconnectReducer = (state = true, action) => {
    if(action && action.type === types.CHANGE_AUTOCONNECT) {
        return action.payload;
    }
    return state;
};

const changeServerUrlReducer = (state = 'http://lobsters.tech', action) => {
    if (action && action.type === types.CHANGE_SERVER_URL) {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    connected: changeConnectReducer,
    coms: portReducer,
    autoconnect: changeAutoconnectReducer,
    serverUrl: changeServerUrlReducer
});
