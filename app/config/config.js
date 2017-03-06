import { app } from 'electron';
import { join, resolve, isAbsolute } from 'path';
import defaultSettings from './defaultSettings';
import { writeFileSync } from 'fs';


let config = {};
try {
    config = {
        ...config,
        ...require('./config.local')
    };
}
catch(e) { console.log('Skipping local config'); }
finally {
    config.IS_DEV = process.env.NODE_ENV !== 'production';
    config.USER_DATA = config.IS_DEV ? join(__dirname, '../') : app.getPath('userData');
    config.RESOURCE_LOCATION = join(__dirname, '../resources');
    config.USER_SETTINGS = join(config.USER_DATA, 'user_settings.json');
}

export const CONFIG_KEYS = () => Object.keys(config);

export const getConfigValues = (...vars) => {
    if (vars.length === 0) return config;
    if (vars.length === 1) return config[vars[0]];
    const toReturn = [];
    for (let key of vars) {
        toReturn.push(config.hasOwnProperty(key) ? config[key] : null);
    }
    return toReturn;
};


let settings = {...defaultSettings};

export const SETTINGS_KEYS = () => Object.keys(settings);

export const setSettings = (key, value) => {
    settings[key] = value;
};

export const saveSettings = (filepath = null, cb = null) => {
    if (filepath === null || typeof filepath === undefined) filepath = getConfigValues('USER_SETTINGS');
    if (typeof filepath !== 'string') throw new TypeError('Settings file location must be a string');
    if (!isAbsolute(filepath)) filepath = resolve(getConfigValues('USER_DATA'), filepath);
    writeFileSync(resolve(filepath), JSON.stringify(settings));
};

export const loadSettings = (filepath = null) => {
    if (filepath === null) filepath = getConfigValues('USER_SETTINGS');
    if (typeof filepath !== 'string') throw new TypeError('Settings file location must be a string');
    if (!isAbsolute(filepath)) filepath = resolve(getConfigValues('USER_DATA'), filepath);
    const userSettings = require(resolve(filepath));
    settings = {...settings, ...userSettings};
};

export const getSettingsValues = (...vars) => {
    if (vars.length === 0) return settings;
    if (vars.length === 1) return settings[vars[0]];
    const toReturn = [];
    for(let key in vars) {
        toReturn.push(settings.hasOwnProperty(key) ? settings[key] : null);
    }
    return toReturn;
};
