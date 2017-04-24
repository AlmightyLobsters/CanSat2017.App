import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/settingActions';

const autoConnectChangeFactory = dispatch => e => {
    dispatch(actions.changeAutoconnectAction(e.target.checked));
};

const serverUrlChangeFactory = dispatch => e => {
    dispatch(actions.changeServerUrl(e.target.value));
};

const Settings = ({ autoconnect, serverUrl, autoConnectChange, serverUrlChange }) => (
    <div id="settings">
        <h1>Settings</h1>
        <div id="controls">
            <div className="autoconnect">
                <label htmlFor="Autoconnect">Autoconnect</label>
                <input name="Autoconnect" type="checkbox" onChange={autoConnectChange.bind(this)} checked={autoconnect} />
            </div>
            <div className="serverUrl">
                <label htmlFor="serverUrl">Server URL</label>
                <input name="serverUrl" type="text" onChange={serverUrlChange.bind(this)} value={serverUrl} />
            </div>
        </div>
    </div>
);

export default connect(store => ({
    autoconnect: store.settings.autoconnect,
    serverUrl: store.settings.serverUrl
}), dispatch => ({
    autoConnectChange: autoConnectChangeFactory(dispatch),
    serverUrlChange: serverUrlChangeFactory(dispatch)
}))(Settings);
