import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import SerialPort from 'serialport';
import { changeConnectAction, portAction } from './actions/settingActions';
import { addPacket, bufferToPacket } from './helpers';

const routerHistory = syncHistoryWithStore(hashHistory, store);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

/* serial port initialization */
SerialPort.list((err, ports) => {
    if (err) throw err;
    if (store.getState().settings.autoconnect && ports.length === 1) {
        let com = ports[0].comName;
        store.dispatch(portAction(com));
        let port = new SerialPort(com, {
            baudrate: 9600,
            parser: SerialPort.parsers.raw
        });
        if(port) store.dispatch(changeConnectAction(true));
        else throw new Error('Serial connection was not established');

        port.on('data', (data) => {
            console.log(data);
            data = bufferToPacket(data);
            addPacket(data);
        });
    }
    else store.dispatch(changeConnectAction(false));
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={routerHistory} routes={routes} />
    </Provider>,
  rootElement
);
