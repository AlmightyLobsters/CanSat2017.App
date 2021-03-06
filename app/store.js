import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import telemetry from './reducers/telemetryReducer';
import settings from './reducers/settingReducer';
import calculatedValues from './reducers/calculatedReducer';
import calibration from './reducers/calibrationReducer';


const initialState = {
    telemetry: {
        times: [],
        primary: {
            temps: [],
            press: [],
            hmdts: []
        },
        gps: {
            latts: [],
            latts_o: [],
            longs: [],
            longs_o: [],
            altts: []
        },
        stats: {
            rssis: [],
            batlvls: []
        },
        acc: {
            xs: [],
            ys: [],
            zs: []
        },
        rot: {
            xs: [],
            ys: [],
            zs: []
        },
        mag: {
            xs: [],
            ys: [],
            zs: []
        },
        vel: {
            accs: [],
            altts: [],
            press: []
        },
        packets: []
    },
    settings: {
        autoconnect: true,
        connected: null,
        coms: [],
        serverUrl: 'http://lobsters.tech'
    },
    calculatedValues: {
        relAlts: [],
        framedAccs: {
            xs: [],
            ys: [],
            zs: []
        },
        gpsPress: [],
        est: 0,
        wvel: []
    },
    calibration: {
        time: 0,
        temp: 0,
        pres: 0,
        alt: 0,
        hmdt: 0,
        gps: [],
        acc: [],
        mag: [],
        rot: [],
        batlvl: 0
    }
};


const router = routerMiddleware(hashHistory);

const actionCreators = {
    push
};

const reducers = {
    routing,
    telemetry,
    settings,
    calculatedValues,
    calibration
};

const middlewares = [ thunk, router ];

const composeEnhancers = (() => {
    const compose_ = typeof window !== 'undefined' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
        return compose_({ actionCreators });
    }
    return compose;
})();

function configureStore(initialState) {
    const enhancer = composeEnhancers(applyMiddleware(...middlewares), /*persistState()*/);
    const rootReducer = combineReducers(reducers);

    return createStore(rootReducer, initialState, enhancer);
}
export default configureStore(initialState);
