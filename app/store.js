import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import telemetry from './reducers/telemetryReducer';
import settings from './reducers/settingReducer';


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
            batlvls: [],
            proprots: []
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
        }
    },
    settings: {
    }
};


const router = routerMiddleware(hashHistory);

const actionCreators = {
    push
};

const reducers = {
    routing,
    telemetry,
    settings
};

const middlewares = [ thunk, router ];

const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
        return compose_({ actionCreators });
    }
    return compose;
})();

function configureStore(initialState) {
    const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
    const rootReducer = combineReducers(reducers);

    return createStore(rootReducer, initialState, enhancer);
}
export default configureStore(initialState);
