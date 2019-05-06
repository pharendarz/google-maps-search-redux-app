// redux
import {combineReducers } from 'redux';
// reducers
import locationsReducer from './locationsReducer';
import locationsBufferReducer from './locationsBufferReducer';
import infoWindowsReducer from './infoWindowsReducer';
import markersReducer from './markersReducer';
import mapReducer from './mapReducer';

export default combineReducers({
    locationsOnList: locationsReducer,
    locationsBuffer: locationsBufferReducer,
    //ADD CONFIG REDUCER for example: 
    map: mapReducer,
    markers: markersReducer,
    infoWindows: infoWindowsReducer,
    //zoom for google maps, it cant be 
})