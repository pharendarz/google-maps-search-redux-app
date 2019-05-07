// redux
import {combineReducers } from 'redux';
// reducers
import locationsReducer from './locationsReducer';
import locationsBufferReducer from './locationsBufferReducer';
import infoWindowsReducer from './infoWindowsReducer';
import markersReducer from './markersReducer';
import mapReducer from './mapReducer';
import snackbarsReducer from './snackbarsReducer';

export default combineReducers({
    locationsOnList: locationsReducer,
    locationsBuffer: locationsBufferReducer,
    map: mapReducer,
    markers: markersReducer,
    infoWindows: infoWindowsReducer,
    snackbars: snackbarsReducer
})