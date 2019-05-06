export const addMarker = (marker) => {
    return {
        type: 'ADD_MARKER',
        payload: marker
    }
}
export const deleteMarker = (marker) => {
    // console.log('MARKER::::::::::::::::::::::::::::', marker)
    return {
        type: 'DELETE_MARKER',
        payload: marker
    }
}