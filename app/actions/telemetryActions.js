import * as types from './telemetryActionTypes';

/*
    Packet structure:
    TIME,TEMPERATURE,PRESSURE,HUMIDITY,LATITUDE,LATITUDE_ORIENTATION,LONGITUDE,LONGITUDE_ORIENTATION,ALTITUDE,RSSI,BATTERY_LEVEL,PROPELLER_ROTATION,X_ACCELERATION,Y_ACCELERATION,Z_ACCELERATION,X_ROTATION,Y_ROTATION,Z_ROTATION,X_MAGNETIC_FIELD,Y_MAGNETIC_FIELD,Z_MAGNETIC_FIELD
*/

export const addTimeAction = time => ({
    type: types.ADD_TIME,
    payload: time
});

export const addPrimAction = (temperature, pressure, humidity) => ({
    type: types.ADD_PRIM,
    payload: {
        temperature,
        pressure,
        humidity
    }
});

export const addGpsAction = (latitudeVal, latitudeOr, longitudeVal, longitudeOr, altitudeVal) => ({
    type: types.ADD_GPS,
    payload: {
        latitude: {
            value: latitudeVal,
            orientation: latitudeOr
        },
        longitude: {
            value: longitudeVal,
            orientation: longitudeOr
        },
        altitude: altitudeVal
    }
});

export const addStatsAction = (rssi, batteryLevel) => ({
    type: types.ADD_STATS,
    payload: {
        rssi,
        batteryLevel
    }
});

export const addAccAction = (x, y, z) => ({
    type: types.ADD_ACC,
    payload: {
        x,
        y,
        z
    }
});

export const addRotAction = (x, y, z) => ({
    type: types.ADD_ROT,
    payload: {
        x,
        y,
        z
    }
});

export const addMagAction = (x, y, z) => ({
    type: types.ADD_MAG,
    payload: {
        x,
        y,
        z
    }
});

export const addVelAction = (accelerationVelocity, altitudeVelocity, pressureVelocity) => ({
    type: types.ADD_VEL,
    payload: {
        accelerationVelocity,
        altitudeVelocity,
        pressureVelocity
    }
});
