import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import SerialPort from 'serialport';
import { changeConnectAction, portAction } from './actions/settingActions';
import { addPacket, bufferToPacket, serialConnect } from './helpers';

const routerHistory = syncHistoryWithStore(hashHistory, store);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

/* establishing serial connection */
SerialPort.list((err, ports) => {
    if (err) throw err;
    if (store.getState().settings.autoconnect && ports.length === 1) {
        let com = ports[0].comName;
        serialConnect(com, 9800).on('data', (data) => {
            console.log(data);
            addPacket(bufferToPacket(data));
        }).on('error', err => {
            store.dispatch(changeConnectAction(false));
            throw new Error(err);
        }).on('disconnect', () => {
            store.dispatch(changeConnectAction(false));
        });
    }
    else store.dispatch(changeConnectAction(false));
    store.dispatch(portAction(ports));
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={routerHistory} routes={routes} />
    </Provider>,
  rootElement
);
