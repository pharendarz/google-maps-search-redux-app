import {deleteFromBufferAfterMerge} from './locationBufferActions';
import {getPlaceByGeocodeLatLng} from '../functions/mapFunctions';

export const mergeLocationsWithBufferList = (locationsBuffer) => (dispatch, getState) => { 
    dispatch({
            type: 'MERGE_LOCATIONS_WITH_BUFFER',
            payload: locationsBuffer,
        }
    );
    dispatch(deleteFromBufferAfterMerge());
}
export const deleteOneLocationFromLocationList = (objPlace) => {
    return {
        type: 'DELETE_ONE_LOCATION_FROM_LOCATION_LIST',
        payload: objPlace
    }
}
export const deleteAllLocationsFromLocationList = (props) => (dispatch) => {

    props.locationsOnList.forEach(location => {
        // console.log('location', location);
        
        // dispatch(deleteMarker(location.marker));
        getPlaceByGeocodeLatLng(
            location.latLng, 
            props.map, 
            location, 
            props, 
            '_findAndDeleteStoredMarker',
            null);
        // dispatch(deleteOneLocationFromLocationList(location));
    })
}